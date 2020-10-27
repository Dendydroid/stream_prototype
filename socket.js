const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
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