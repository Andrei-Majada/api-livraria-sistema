const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
console.log('API rodando na porta: ', port);

function normalizePort(val) {
    const porta = parseInt(val, 10);

    if (isNaN(porta)) {
        return val; 
    }

    if (porta >= 0) {
        return porta;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
    ?   'Pipe ' + port
    :   'Port ' + port;
    
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requer um maior privilegio!');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' ja esta em uso!');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

module.exports = app;