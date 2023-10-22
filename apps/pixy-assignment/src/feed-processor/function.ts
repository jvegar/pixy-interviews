import handler from '../libs/handler-lib';

import dynamoDb from '../libs/dynamodb-lib';
import fetch from 'node-fetch';
import * as uuid from 'uuid';
import { AqiLevels, Feed, TableParams } from '../interfaces';

export const main = handler(async (event, context) => {
  const dbParams = {
    TableName: process.env.TABLE_NAME_STATIONS,
  };

  const result = await dynamoDb.scan(dbParams);
  const feedUriList = [];

  function getFeedUri(item: any): string {
    return `${process.env.WAQI_BASE_URL}/${item.country}/${item.city}/${item.station}/?token=${process.env.WAQI_TOKEN}`;
  }

  // Get Feed Uri List
  result.Items.forEach((item) => {
    const feedUri = getFeedUri(item);
    feedUriList.push(feedUri);
  });

  for (const feedUri of feedUriList) {
    const response = await fetch(feedUri);
    const feedData = await response.json();

    let level = AqiLevels.UNDEFINED;

    const aqi = feedData.data.aqi;

    if (aqi >= 0 && aqi <= 50) level = AqiLevels.GOOD;
    if (aqi > 50 && aqi <= 100) level = AqiLevels.MODERATE;
    if (aqi > 100 && aqi <= 150) level = AqiLevels.UNHEALTHY_SENSITIVE_GROUPS;
    if (aqi > 150 && aqi <= 200) level = AqiLevels.UNHEALTHY;
    if (aqi > 200 && aqi <= 300) level = AqiLevels.VERY_UNHEALTHY;
    if (aqi > 300) level = AqiLevels.HAZARDOUS;

    const feedItem: Feed = {
      feedId: uuid.v1(),
      idx: feedData.data.idx,
      aqi: feedData.data.aqi,
      time: feedData.data.time.iso,
      level: level,
      city: feedData.data.city.name,
      url: feedData.data.city.url,
      createdAt: Date.now(),
    };

    const params: TableParams = {
      TableName: process.env.tableNameFeeds,
      Item: feedItem,
    };

    try {
      await dynamoDb.put(params);
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
  };
});
