const https = require('https');

module.exports = (text, callback) => {
  function process(data) {
    let response = JSON.parse(data);
    callback(response.text[0]);
  }

  function handler(response) {
    let data = '';
    response.on('data', function (chunk) {
      data += chunk;
    });

    response.on('end', function () {
      process(data);
    });
  }

  const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df&text=' + text + '&lang=en-ru';
  const request = https.request(url);
  request.on('response', handler);
  request.end();
};
