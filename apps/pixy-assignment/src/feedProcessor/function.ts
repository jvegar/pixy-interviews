import handler from '../libs/handler-lib';
import dynamoDb from '../libs/dynamodb-lib';
import fetch from 'node-fetch';
import * as uuid from 'uuid';
import { Feed_Params } from './../interfaces';

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableNameStations,
  };

  const result = await dynamoDb.scan(params);
  const feedUriList = [];
  const dataList = [];
  result.Items.forEach((e) => {
    const feedUri = `${process.env.waqi_baseurl}/${e.country}/${e.city}/${e.station}/?token=${process.env.waqi_token}`;
    feedUriList.push(feedUri);
  });

  for (let i = 0; i < feedUriList.length; i++) {
    const response = await fetch(feedUriList[i]);
    const d = await response.json();
    let level = 'Undefined';
    const aqi = d.data.aqi;

    if (aqi >= 0 && aqi <= 50) level = 'Good';
    if (aqi > 50 && aqi <= 100) level = 'Moderate';
    if (aqi > 100 && aqi <= 150) level = 'Unhealthy for Sensitive Groups';
    if (aqi > 150 && aqi <= 200) level = 'Unhealthy';
    if (aqi > 200 && aqi <= 300) level = 'Very Unhealthy';
    if (aqi > 300) level = 'Hazardous';

    const params: Feed_Params = {
      TableName: process.env.tableNameFeeds,
      Item: {
        feedid: uuid.v1(),
        idx: d.data.idx,
        aqi: d.data.aqi,
        time: d.data.time.iso,
        level: level,
        city: d.data.city.name,
        url: d.data.city.url,
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
});
