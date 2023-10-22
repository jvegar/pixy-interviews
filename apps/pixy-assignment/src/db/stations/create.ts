import * as uuid from 'uuid';
import dynamoDb from '../../libs/dynamodb-lib';
import { Station, TableParams } from '../../interfaces';

export async function main(event, context) {
  const data = JSON.parse(event.body);

  const stationItem: Station = {
    stationId: uuid.v1(),
    idx: data.idx,
    country: data.country,
    city: data.city,
    station: data.station,
    createdAt: Date.now(),
  };

  const dbParams: TableParams = {
    TableName: process.env.TABLE_NAME_STATIONS,
    Item: stationItem,
  };

  try {
    await dynamoDb.put(dbParams);
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
