import handler from '../../libs/handler-lib';
import dynamoDb from '../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableNameStations,
    Key: {
      stationid: event.pathParameters.id,
    },
  };

  try {
    await dynamoDb.delete(params);
    return {
      statusCode: 200,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
});
