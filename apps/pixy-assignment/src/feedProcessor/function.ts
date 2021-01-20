import handler from '../libs/handler-lib';
import dynamoDb from '../libs/dynamodb-lib';
import fetch from 'node-fetch';
import * as uuid from 'uuid';

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableNameStations,
  };

  const result = await dynamoDb.scan(params);
  const feedUriList = [];
  const dataList = [];
  result.Items.forEach(async (e) => {
    const feedUri = `${process.env.waqi_baseurl}/${e.country}/${e.city}/${e.station}/?token=${process.env.waqi_token}`;
    feedUriList.push(feedUri);
  });

  for (let i = 0; i < feedUriList.length; i++) {
    const response = await fetch(feedUriList[i]);
    const d = await response.json();
    let level = 'Undefined';

    if (d.data.aqi >= 0 && d.data.aqi <= 50) level = 'Good';
    if (d.data.aqi > 50 && d.data.aqi <= 100) level = 'Moderate';
    if (d.data.aqi > 100 && d.data.aqi <= 150) level = 'Unhealthy for Sensitive Groups';
    if (d.data.aqi > 150 && d.data.aqi <= 200) level = 'Unhealthy';
    if (d.data.aqi > 200 && d.data.aqi <= 300) level = 'Ver Unhealthy';
    if (d.data.aqi > 300) level = 'Hazardous';

    const params = {
      TableName: process.env.tableNameFeeds,
      Item: {
        // The attributes of the item to be created
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
    } catch (e) {
      console.log(e);
    }
  }

  return dataList;
});
