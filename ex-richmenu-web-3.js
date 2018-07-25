const config = require('../config.js')
const request = require('request-promise')

// When user send NEXT, Bot will call Rich Menu API for attaching Rich Menu Page 2 to that user
const nextPage = (userId) => {
  return request({
    method: 'POST',
    uri: `https://api.line.me/v2/bot/user/${userId}/richmenu/${config.cryptoPage2RichMenuId}`,
    headers: {
      Authorization: `Bearer ${config.channelAccessToken}`
    },
    json: true
  })
}

// When user send PREVIOUS, Bot will call Rich Menu API for detach current Rich Menu, 
// which will show the default rich menu that set via Admin Console 
const previousPage = (userId) => {
  return request({
    method: 'DELETE',
    uri: `https://api.line.me/v2/bot/user/${userId}/richmenu`,
    headers: {
      Authorization: `Bearer ${config.channelAccessToken}`
    },
    json: true
  })
}

module.exports = {
  nextPage,
  previousPage
}