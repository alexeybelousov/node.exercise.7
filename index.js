const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const port = process.env.PORT || 3000;
const api = require('./api');

function handler(req, res) {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function () {
      var post = qs.parse(body);

      api(post['text'], function(data) {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        let body = '<div>' + data + '</div>'
        res.write(body, 'utf-8');
        res.end();
      });
    });
  } else {
    fs.readFile('./form.html', function (err, html) {
        if (err) {
          throw err;
        }
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    });
  }
}

const server = http.createServer();
server.on('error', err => console.error(err));
server.on('request', handler);
server.on('listening', () => {
  console.log('Start HTTP on port %d', port);
});
server.listen(port);
