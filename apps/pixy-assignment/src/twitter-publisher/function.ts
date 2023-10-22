import AWS from 'aws-sdk';
import Twitter from 'twitter';

const sns = new AWS.SNS();

const client = new Twitter({
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token_key: process.env.twitter_access_token_key,
  access_token_secret: process.env.twitter_access_token_secret,
});

exports.handler = (event, context, callback) => {
  event.Records.forEach((record) => {
    console.log('Stream record: ', JSON.stringify(record, null, 2));

    if (record.eventName == 'INSERT') {
      const aqi = JSON.stringify(record.dynamodb.NewImage.aqi.N);
      const level = JSON.stringify(record.dynamodb.NewImage.level.S);
      const city = JSON.stringify(record.dynamodb.NewImage.city.S);
      const time = JSON.stringify(record.dynamodb.NewImage.time.S);
      const params = {
        Subject: `WAQI alerts: new data for ${city}`,
        Message: `The aqi value for ${city} is ${aqi} which is ${level} at ${time}`,
        TopicArn: 'arn:aws:sns:us-east-1:946932859547:waqiTopic',
      };
      sns.publish(params, function (err, data) {
        if (err) {
          console.error('Unable to send message. Error JSON:', JSON.stringify(err, null, 2));
        } else {
          console.log('Results from sending message: ', JSON.stringify(data, null, 2));
        }
      });

      client.post('statuses/update', { status: params.Message }, function (error, tweet, response) {
        if (error) {
          console.log(error);
        } else {
          console.log(tweet);
        }
      });
    }
  });
  callback(null, `Successfully processed ${event.Records.length} records.`);
};
