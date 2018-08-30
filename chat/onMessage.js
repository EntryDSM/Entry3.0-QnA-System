const msgQueue = require('./messageQueue');
const auth = require('../auth');

module.exports = (data, io, socket) => {
  const { message, userId, key } = data;
  let ns = null;
  let room = null;
  if (auth.isAdmin(key)) {
    ns = io.in(userId);
    room = userId;
  } else {
    ns = io.in(socket.id);
    room = socket.id;
  }
  ns.clients((err, sockets) => {
    const { length } = sockets;
    if (length < 2) {
      msgQueue.addMessage(room, message);
    } else {
      ns.emit('message', { message });
    }
  });
};
