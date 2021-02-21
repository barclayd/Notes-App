import { CloudFormationResources } from "serverless/plugins/aws/provider/awsProvider";

export const apiGatewayErrors: CloudFormationResources = {
  GatewayResponseDefault4XX: {
    Type: "AWS::ApiGateway::GatewayResponse",
    Properties: {
      ResponseParameters: {
        "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
        "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
      },
      ResponseType: "DEFAULT_4XX",
      RestApiId: {
        Ref: "ApiGatewayRestApi",
      },
    },
  },
  GatewayResponseDefault5XX: {
    Type: "AWS::ApiGateway::GatewayResponse",
    Properties: {
      ResponseParameters: {
        "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
        "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
      },
      ResponseType: "DEFAULT_5XX",
      RestApiId: {
        Ref: "ApiGatewayRestApi",
      },
    },
  },
};

export const cognitoPolicy: CloudFormationResources = {
  CognitoAuthorizedApiPolicy: {
    Type: "AWS::IAM::POLICY",
    Properties: {
      PolicyName: "${self:custom.stage}-CognitoNotesAuthorizedApiPolicy",
      PolicyDocument: {
        Version: "2012-10-17",
        Statement: {
          Effect: "Allow",
          Action: ["execute-api:Invoke"],
          Resource:
            "!Sub arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${ApiGatewayRestApi}/*",
        },
      },
      Roles: ["!ImportValue ${self:custom.sstApp}-CognitoAuthRole"],
    },
  },
};
