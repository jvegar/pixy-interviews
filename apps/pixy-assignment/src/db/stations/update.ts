import handler from '../../libs/handler-lib';
import dynamoDb from '../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableNameStations,
    Key: {
      stationid: event.pathParameters.id,
    },
    UpdateExpression: 'SET city = :city, country = :country, station = :station',
    ExpressionAttributeValues: {
      ':city': data.idx || null,
      ':country': data.cityName || null,
      ':station': data.station || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    await dynamoDb.update(params);
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
