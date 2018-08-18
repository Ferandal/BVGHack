const fs = require('fs'),
      path = require('path'),
      http = require('http');


function updateTrain(json){
  let jsonData = JSON.parse(json);
}

const server = http.createServer((request, response) => {
  if(request.url.includes('/push')){
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        updateTrain(body);
        response.writeHead(200);
        response.end();
    });
  }else{
    let filePath = __dirname+((request.url == '/') ? '/serverHelper/index.html' :('/serverHelper'+request.url));
      const extname = path.extname(filePath);
      let contentType = 'text/plain';
      switch(extname) {
          case '.html':
              contentType = 'text/html';
              break;
          case '.js':
              contentType = 'text/javascript';
              break;
          case '.css':
              contentType = 'text/css';
              break;
          case '.json':
              contentType = 'application/json';
              break;
          case '.png':
              contentType = 'image/png';
              break;
          case '.jpg':
              contentType = 'image/jpg';
              break;
          case '.svg':
              contentType = 'image/svg+xml';
              break;
      }

      fs.readFile(filePath, function(error, content) {
          if(error) {
              if(error.code == 'ENOENT')
                  response.writeHead(404);
              else
                  response.writeHead(500);
          } else {
              response.writeHead(200, {
                  'Content-Type': contentType
              });

              response.write(content);
          }
          response.end();
      });
    }
}).on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
}).listen(8080);