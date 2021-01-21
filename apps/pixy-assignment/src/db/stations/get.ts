import handler from '../../libs/handler-lib';
import dynamoDb from '../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableNameStations,
    Key: {
      stationid: event.pathParameters.stationid,
      idx: event.pathParameters.idx,
    },
  };

  try {
    const result = await dynamoDb.get(params);
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
