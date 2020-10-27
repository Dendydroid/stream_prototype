const WebSocketServer = require('ws').Server;
const https = require('https');
const express = require('express');
const fs = require('fs');

// process.env.JWT_PRIVATE_KEY.replace(/\\n/gm, '\n')

var privateKey = fs.readFileSync('secure/key.pem', 'utf8');
var certificate = fs.readFileSync('secure/server.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials);
httpsServer.listen(8443);

const wss = new WebSocketServer({
    server: httpsServer,
});

wss.on('connection', ws => {
    ws.on('message', message => {
        message = JSON.parse(message);
        console.log(message);
        if(message.user === 1)// simple exchange for now
        {
            message.user = 2;
            ws.send(JSON.stringify(message));
        }
        if(message.user === 2)
        {
            message.user = 1;
            ws.send(JSON.stringify(message));
        }
    });
});

wss.on("error", err => {
    console.log(err)
})