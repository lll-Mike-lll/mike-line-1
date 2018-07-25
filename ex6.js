const line = require('@line/bot-sdk');
const express = require('express');

const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN ? process.env.CHANNEL_ACCESS_TOKEN : 'cGSvZULt+kZbdp+iDe53qV11sZNINaR0iS30yn368okhpZuiU2YCKoPKWB89XzPM6pGRUAr/z5oP2+j1T+8tE5c9tj4IKPucB5LADnh7pa7e6PTmIRuSOcwwUQRRRD4aldf8jXE78lT5+t4x4fwRjQdB04t89/1O/w1cDnyilFU=';
const CHANNEL_SECRET = process.env.CHANNEL_SECRET ? process.env.CHANNEL_SECRET : 'e2c01a6936c650c853d09d5d92e05d18';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});