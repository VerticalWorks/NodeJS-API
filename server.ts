const express = require('express');
const app = express();
const assert = require('assert').strict;
const weatherRouter = require('./routes/weather-routes');
const EventEmitter = require('events');
const PORT = process.env.port || 4242;
const myEmitter = new EventEmitter();

myEmitter.on('server-up',() => {
  console.log(`Server-Up: ${Date.now().toString()}`);
});

myEmitter.on('server-down',() => {
  console.log(`Server-Down: ${Date.now().toString()}`);
});


app.use('/api/v1', weatherRouter);

app.get('/',(req:any ,res:any) => res.send('Bowman\'s EXPRESS API Server'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Running at https://localhost:${PORT}`);
  myEmitter.emit('server-up');  
});




