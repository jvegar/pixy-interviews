import AWS from 'aws-sdk';
const sns = new AWS.SNS();

exports.handler = (event, context, callback) => {
  event.Records.forEach((record) => {
    console.log('Stream record: ', JSON.stringify(record, null, 2));

    if (record.eventName == 'INSERT') {
      const aqi = JSON.stringify(record.dynamodb.NewImage.aqi.S);
      const country = JSON.stringify(record.dynamodb.NewImage.country.S);
      const city = JSON.stringify(record.dynamodb.NewImage.city.S);
      const station = JSON.stringify(record.dynamodb.NewImage.station.S);
      const params = {
        Subject: `WAQI alerts: new data for ${country},${city}`,
        Message: `Dear user the station ${station} has a aqi value of ${aqi}`,
        TopicArn: 'arn:aws:dynamodb:us-east-1:946932859547:wooferTopic',
      };
      sns.publish(params, function (err, data) {
        if (err) {
          console.error('Unable to send message. Error JSON:', JSON.stringify(err, null, 2));
        } else {
          console.log('Results from sending message: ', JSON.stringify(data, null, 2));
        }
      });
    }
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};
