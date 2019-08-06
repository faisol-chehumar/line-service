import express from 'express';
import * as line from '@line/bot-sdk';

const config = {
  channelAccessToken: 'm/qyU5b/MOlSGl/YjjDIOj5aBqZcMN7G1Rq3IchjDGb8MLN3LenRv2KbP87mThFt94gn8sWfXqtEYLxejrt4DRZiuldtRWd3QnCZDua8SaxbQKlsrt0fg/lzA1Pd+hQIjLQ1J/YBuI8Gw8+OlpS2EAdB04t89/1O/w1cDnyilFU=',
  channelSecret: '384eee2ad83799d4c75045900bca935c'
};

const app = express();
const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(() => res.status(200));
});

app.use('/_healthcheck', (_req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    text: 'Hello'
  });
});

function handleEvent(event: line.MessageEvent) {
  if(event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000, () => { console.log('Running at localhost:3000') })