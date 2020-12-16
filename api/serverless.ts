import type { Serverless, ApiGateway } from 'serverless/aws';
import { Functions } from 'serverless/plugins/aws/provider/awsProvider';

interface UpdatedServerless {
  useDotenv: boolean;
}

type LatestServerless = Serverless & UpdatedServerless;

const LONDON_REGION = 'eu-west-2';

type httpMethod = 'get' | 'put' | 'post';

const awsFunction = (
  name: string,
  method: httpMethod = 'get',
  path?: string,
): Functions => ({
  [name]: {
    handler: `src/api/${name}.main`,
    events: [
      {
        http: {
          path: `notes${path ?? ''}`,
          method,
        },
      },
    ],
  },
});

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
    ...awsFunction('create', 'post'),
    ...awsFunction('get', 'get', '/${id}'),
    ...awsFunction('list'),
    ...awsFunction('update', 'put', '/{id}'),
  },
};

module.exports = serverlessConfig;
