const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Erstelle einen HTTP-Server, der auf Anfragen reagiert
const server = http.createServer((request, response) => {
    console.log(`Anfrage: ${request.method} ${request.url}`);

    // Setze den Statuscode und den Content-Type der Antwort
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');

    // Sende die Antwort zurück
    response.end('Hallo, dies ist der Node.js Antwortserver! Marc');
});

// Starte den Server und höre auf dem definierten Host und Port
server.listen(port, hostname, () => {
    console.log(`Server läuft unter http://${hostname}:${port}/`);
});