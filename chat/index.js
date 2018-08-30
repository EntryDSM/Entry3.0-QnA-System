const onJoin = require('./onJoin');
const onMessage = require('./onMessage');
const onDisconnect = require('./onDisconnect');
const onList = require('./onList');

const onConnect = (socket, io) => {
  socket.on('join', (joinConfig) => {
    onJoin(joinConfig, io, socket);
  });

  socket.on('message', (data) => {
    onMessage(data, io);
  });

  socket.on('disconnect', (data) => {
    onDisconnect(data, io, socket);
  });

  socket.on('list', (data) => {
    onList(data, io, socket);
  });
};

module.exports = {
  onConnect,
};
