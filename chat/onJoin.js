const auth = require('../auth');
const connected = require('./connectedUsers');
const msgQueue = require('./messageQueue');


module.exports = (joinConfig, io, socket) => {
  const { key, userId } = joinConfig;
  auth.checkKey(key, (err, res) => {
    if (err || !res) {
      socket.disconnect(true);
    } else {
      const room = auth.isAdmin(key) ? userId : socket.id;
      socket.join(room);
      connected.addUser(socket.id, key);
      if (auth.isAdmin(key)) {
        io.emit('connect admin');
      }
      io.emit('admins', { count: connected.countAdmin() });
      if (msgQueue.existsMessage(room)) {
        io.in(room).emit(msgQueue.getMessage(room));
      }
    }
  });
};
