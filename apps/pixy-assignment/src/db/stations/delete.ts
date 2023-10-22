import handler from '../../libs/handler-lib';
import dynamoDb from '../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const stationKey = event.pathParameters.id;

  const dbParams = {
    TableName: process.env.TABLE_NAME_STATIONS,
    Key: {
      stationid: stationKey,
    },
  };

  try {
    await dynamoDb.delete(dbParams);
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
