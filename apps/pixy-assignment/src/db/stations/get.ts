import handler from '../../libs/handler-lib';
import dynamoDb from '../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const dbParams = {
    TableName: process.env.TABLE_NAME_STATIONS,
    Key: {
      stationid: event.pathParameters.stationid,
      idx: event.pathParameters.idx,
    },
  };

  try {
    const result = await dynamoDb.get(dbParams);
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
});
