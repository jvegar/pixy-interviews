import * as uuid from 'uuid';
import dynamoDb from '../../libs/dynamodb-lib';
import { Station_Params } from '../../interfaces';

export async function main(event, context) {
  const data = JSON.parse(event.body);

  const params: Station_Params = {
    TableName: process.env.tableNameStations,
    Item: {
      stationid: uuid.v1(),
      idx: data.idx,
      country: data.country,
      city: data.city,
      station: data.station,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamoDb.put(params);
    return {
      statusCode: 200,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
