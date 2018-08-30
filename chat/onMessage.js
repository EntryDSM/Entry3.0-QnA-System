const msgQueue = require('./messageQueue');

module.exports = (data, io) => {
  const { key, message } = data;
  io.clients((err, sockets) => {
    const { length } = sockets;
    if (length < 2) {
      msgQueue.addMessage(key, message);
    } else {
      io.in(key).emit(message);
    }
  });
};
