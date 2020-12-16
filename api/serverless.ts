import type { Serverless, ApiGateway } from 'serverless/aws';

interface UpdatedServerless {
  useDotenv: boolean;
}

type LatestServerless = Serverless & UpdatedServerless;

const LONDON_REGION = 'eu-west-2';

const serverlessConfig: LatestServerless = {
  service: 'notes-api',
  frameworkVersion: '2',
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: LONDON_REGION,
    environment: {
      tableName: 'notes',
    },
    apiGateway: {
      shouldStartNameWithService: true,
    } as ApiGateway,
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Scan',
          'dynamodb:Query',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
          'dynamodb:DescribeTable',
        ],
        Resource: `arn:aws:dynamodb:${LONDON_REGION}:*:*`,
      },
    ],
  },
  package: {
    individually: true,
  },
  plugins: [
    'serverless-bundle',
    'serverless-offline',
    'serverless-dotenv-plugin',
  ],
  useDotenv: true,
  functions: {
    create: {
      handler: 'src/api/create.main',
      events: [
        {
          http: {
            path: 'notes',
            method: 'post',
          },
        },
      ],
    },
    get: {
      handler: 'src/api/get.main',
      events: [
        {
          http: {
            path: 'notes/{id}',
            method: 'get',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfig;
