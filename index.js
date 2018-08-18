const fs = require('fs'),
      path = require('path'),
<<<<<<< HEAD
      http = require('http');


function updateTrain(json){
  let jsonData = JSON.parse(json);
=======
      http = require('http'),
      Line = require('./Line.js');
const uSixStations = ['U Alt-Tegel', 'U Borsigwerke', 'U Holzhauser Str.', 'U Otisstr.', 
                      'U Scharnweberstr.', 'U Kurt-Schumacher-Platz', 'U Afrikanische Str.',
                      'U Rehberge', 'U Seestr.', 'U Leopoldplatz', 'S+U Wedding',
                      'U Reinickendorfer Str.', 'U Schwartzkopffstr.', 'U Naturkundemuseum',
                      'U Oranienburger Tor', 'S+U Friedrichstr.', 'U Französische Str.',
                      'U Stadtmitte', 'U Kochstr./Checkpoint Charlie', 'U Hallesches Tor',
                      'U Mehringdamm', 'U Platz der Luftbrücke', 'U Paradestr.', 'S+U Tempelhof',
                      'U Alt-Tempelhof', 'U Kaiserin-Augusta-Str.', 'U Ullsteinstr.',
                      'U Westphalweg', 'U Alt-Mariendorf'];

const lines = [new Line(uSixStations,'U6')];

function updateData(json){
  let jsonData = JSON.parse(json);
  let line = lines.find(x => x.line === jsonData.line);
  if(line){
    line.updateTrain(jsonData);
  }else{
    throw('leo wir wollten nur die U6!');
  }
>>>>>>> 65827b26acd97137742e6d879dd49b1f78d0e46e
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