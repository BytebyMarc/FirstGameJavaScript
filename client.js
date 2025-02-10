const http = require('http');

const options = {
    hostname: '127.0.0.1', // Server-Adresse
    port: 3000,          // Port, auf dem der Server läuft
    path: '/',           // Pfad der Anfrage (Root-Pfad)
    method: 'GET'        // HTTP-Methode
};

const req = http.request(options, res => {
    console.log(`Statuscode: ${res.statusCode}`);

    // Wenn Daten empfangen werden, diese direkt in die Konsole ausgeben
    res.on('data', chunk => {
        process.stdout.write(chunk);
    });
});

// Fehlerbehandlung, falls etwas schiefgeht
req.on('error', error => {
    console.error(`Fehler bei der Anfrage: ${error.message}`);
});

// Sende die Anfrage ab
req.end();
