const { join } = require('path');
const { readFileSync } = require('fs');
const WebSocket = require('ws');

const clientWebsocket = `<script>${readFileSync(join(__dirname, 'client-ws.js'), 'utf8')}</script>`;

function liveReload() {
  const websocketPort = 8090;

  const wss = new WebSocket.Server({
    port: websocketPort,
  });

  wss.on('connection', (ws) => {
    const failureMessage = readFileSync(join(__dirname, '..', 'template', 'failure-message.html'), 'utf8');

    ws.send(failureMessage);
  });
}

exports = module.exports = {};
exports.liveReload = liveReload;
exports.script = clientWebsocket;
