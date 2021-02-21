import type { Serverless, ApiGateway } from "serverless/aws";
import { Functions } from "serverless/plugins/aws/provider/awsProvider";
import { apiGatewayErrors, cognitoPolicy } from "./src/resources";

interface UpdatedServerless {
  useDotenv: boolean;
}

type LatestServerless = Serverless & UpdatedServerless;

const LONDON_REGION = "eu-west-2";

type httpMethod = "get" | "put" | "post" | "delete";

const awsFunction = (
  name: string,
  method: httpMethod = "get",
  path?: string,
  basePath = "notes"
): Functions => ({
  [name]: {
    handler: `src/api/${name}.main`,
    events: [
      {
        http: {
          path: `${basePath}${path ?? ""}`,
          method,
          cors: true,
          authorizer: {
            type: "aws_iam",
          },
        },
      },
    ],
  },
});

const serverlessConfig: LatestServerless = {
  service: "notes-api",
  frameworkVersion: "2",
  custom: {
    stage: "${opt:stage, self:provider.stage}",
    sstApp: "${self:custom.stage}-notes-infrastructure",
  },
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    region: LONDON_REGION,
    stage: "dev",
    environment: {
      TABLE_NAME: "!ImportValue '${self:custom.sstApp}-TableName'",
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    },
    apiGateway: {
      shouldStartNameWithService: true,
    } as ApiGateway,
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:Scan",
          "dynamodb:Query",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:DescribeTable",
        ],
        Resource: ["!ImportValue '${self:custom.sstApp}-TableArn'"],
      },
    ],
  },
  resources: {
    Resources: {
      ...apiGatewayErrors,
      ...cognitoPolicy,
    },
  },
  package: {
    individually: true,
  },
  plugins: [
    "serverless-bundle",
    "serverless-offline",
    "serverless-dotenv-plugin",
  ],
  useDotenv: true,
  functions: {
    ...awsFunction("create", "post"),
    ...awsFunction("get", "get", "/${id}"),
    ...awsFunction("list"),
    ...awsFunction("update", "put", "/{id}"),
    ...awsFunction("delete", "delete", "/{id}"),
    ...awsFunction("billing", "post", undefined, "billing"),
  },
};

module.exports = serverlessConfig;
