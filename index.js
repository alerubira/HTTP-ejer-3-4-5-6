const http = require('http');
const fs = require('fs');
const path = require('path');

const puerto = 3000;

const server = http.createServer((req, res) => {
  // Manejar solicitudes de archivos estáticos desde la carpeta /public
  if (req.method === 'GET') {
    let recurso = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(__dirname, 'public', recurso);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Archivo no encontrado');
      } else {
        // Determinar el tipo de contenido basado en la extensión del archivo
        const extension = path.extname(filePath);
        let contentType = 'text/html';

        switch (extension) {
          case '.css':
            contentType = 'text/css';
            break;
          case '.js':
            contentType = 'text/javascript';
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
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Ruta no admitida');
  }
});

server.listen(puerto, () => {
  console.log(`El servidor está escuchando en http://localhost:${puerto}`);
});
