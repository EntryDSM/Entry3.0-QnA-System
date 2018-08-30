const auth = require('../auth');
const connected = require('./connectedUsers');

module.exports = (data, io, socket) => {
  const { id } = data;
  const key = connected.getKey(id);
  socket.leave(key);
  connected.removeUser(id);
  if (auth.isAdmin(key)) {
    io.emit('disconnect admin');
  }
};
