const auth = require('../auth');
const connected = require('./connectedUsers');
const msgQueue = require('./messageQueue');


module.exports = (joinConfig, io, socket) => {
  const { key } = joinConfig;
  auth.checkKey(key, (err, res) => {
    if (err || !res) {
      socket.disconnect(true);
    } else {
      socket.join(key);
      connected.addUser(socket.id, key);
      if (msgQueue.existsMessage(key)) {
        io.in(key).emit(msgQueue.getMessage(key));
      }
      if (auth.isAdmin(key)) {
        io.emit('connect admin');
      }
    }
  });
};

