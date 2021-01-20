import handler from '../../libs/handler-lib';
import dynamoDb from '../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableNameStations,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      stationid: event.pathParameters.stationid, // The id of the note from the path
      idx: event.pathParameters.idx,
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error('Item not found.');
  }

  // Return the retrieved item
  return result.Item;
});
