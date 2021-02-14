import { APIGatewayEvent, Context } from "aws-lambda";
import { HttpResponse } from "aws-sdk";
import { LambdaService } from "../services/LambdaService";

export const lambdaWrapper = async (
  event: APIGatewayEvent,
  context: Context,
  lambdaLogic: () => Promise<any>
): Promise<HttpResponse> => {
  return await new LambdaService(lambdaLogic, event, context).execute();
};
