import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:3000');

ws.on('error', (e)=>console.log(`get error ${e}`));

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});