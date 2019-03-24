require('dotenv').config();
const twitter = require('twitter');
var speedTest = require('speedtest-net');

const speedTester = () => {
  setInterval(() => {
  var test = speedTest({maxTime: 5000});

  test.on('data', data => {
    if (data.speeds.download < 20) main(data);
  });
  },3600000);
}

const main = (data) => {
  const T = new twitter({
    consumer_key: process.env.twitter_api_key,
    consumer_secret: process.env.twitter_api_key_secret,
    access_token_key: process.env.twitter_access_token,
    access_token_secret: process.env.twitter_access_token_secret
  });

  const params = {
    status: `@comcast @xfinity My current internet speed is ${data.speeds.download}mbps,
             when my current plan is 150mbps. #dontthrottlemebro`
  }

  T.post('statuses/update', params, function(err, data, response) {
  if(!err){
    console.log(data)
  } else {
    console.log(err);
  }
  })
}
speedTester();
