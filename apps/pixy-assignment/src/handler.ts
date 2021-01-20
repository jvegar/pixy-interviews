import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import serverless from 'serverless-http';
import app from './app';

export default async (event: APIGatewayProxyEvent, context: Context) => {
  // connect to database or do any initialization

  return serverless(app)(event, context);
};
