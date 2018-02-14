/**
 * Created by Emile_Bex on 27/11/2017.
 */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const routes = require('./routes');

const PORT = 3001;

let devices = require('../src/data/iot.json');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app, io, devices, (newDevices) => updateDeviceList(newDevices));

io.sockets.on('connection', (socket) => {

  emitInit(socket, devices);

  socket.on('action', (action) => {
    console.log(action);
  });

});


server.listen(PORT);

function emitInit(socket, devices) {
  socket.emit('action', {
    type: 'INIT',
    devices: devices
  });
}

function updateDeviceList(newDevices) {
  devices = newDevices;
  console.log(devices);
}