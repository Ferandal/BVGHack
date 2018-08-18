const fs = require('fs'),
      path = require('path'),
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
let execFile = require('child_process').execFile
let program = "build/Release/serverToArduino";
// execFile will return immediately.
let child = execFile(program, [],
  function (error, stdout, stderr) {
    //executed when finished
});
function setColor(wagon, status) {
    child.stdin.setEncoding('utf-8');
    child.stdin.write(wagon+","+status + "\n");
}

function updateData(json){
  let jsonData = JSON.parse(json);
  let line = lines.find(x => x.line === jsonData.line);
  console.log(line);
  if(line){
    console.log(line);
    line.updateTrain(jsonData);
    for(let i = 0; i < jsonData.wagonsSeats.length; i++){
      if(jsonData.wagonsSeats[i] >= 36){
        setTimeout(() => setColor(i,1), i* 500);
      } else {
        setTimeout(() => setColor(i,0), i* 500);
      }
    }
  }else{
    throw('leo wir wollten nur die U6!');
  }
}

const server = http.createServer((request, response) => {
  if(request.url.includes('/push')){
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        updateData(body);
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
