// File: index.js
// Express listen POST /webhook call and call handler.webhook() function
const app = express();
app.post('/webhook', line.middleware(config), handler.webhook);

// File: handler/index.js
// Response {status: ok} to LINE call right away, but process the actual event in the background
const webhook = (req, res) => {
  console.log("User id: " + req.body.events[0].source.userId)
  Promise
      .all(req.body.events.map(handleEvent))
      .catch((e) => {
          console.log(e)
      })
  return res.json({status: 'ok'})
}

// File:handler/index.js
// Main logic to process event based on trigger message
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve('ok');
  }

  let triggerMsg = event.message.text.toUpperCase()
  triggerMsg = triggerMsg === 'BITCOIN' ? 'BTC' : triggerMsg

  if (triggerMsg === 'NEXT') {
    richMenuApi.nextPage(event.source.userId)
      .then(() => client.pushMessage(event.source.groupId || event.source.userId, [{type: 'text', text: 'เปลี่ยนหน้าสำเร็จ 👌'}]))
  } else if (triggerMsg === 'PREVIOUS') {
    richMenuApi.previousPage(event.source.userId)
      .then(() => client.pushMessage(event.source.groupId || event.source.userId, [{type: 'text', text: 'เปลี่ยนหน้าสำเร็จ 👌'}]))
  } else if (triggerMsg === 'GOLD') {
    goldApi.getLatestPrice(triggerMsg)
      .then(message => {
        client.replyMessage(event.replyToken, message);
      })
  } else {
    historicalChartApi.getChartPicture(triggerMsg).then((message) => {
      if (message) {
        client.pushMessage(event.source.groupId || event.source.userId, message)
      }
    })
    cryptoApi.getLatestPrice(triggerMsg)
      .then(message => {
        if (message) {
          client.replyMessage(event.replyToken, message);
        }
      })
  }
}