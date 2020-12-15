import type { Serverless, ApiGateway } from 'serverless/aws';

interface UpdatedServerless {
  useDotenv: boolean;
}

type LatestServerless = Serverless | UpdatedServerless

const serverlessConfig: LatestServerless = {
  service: 'notes-api',
  frameworkVersion: '2',
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-2',
    apiGateway: {
      shouldStartNameWithService: true,
    } as ApiGateway,
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
    hello: {
      handler: 'handler.hello',
      events: [
        {
          http: {
            path: 'hello',
            method: 'get',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfig;
