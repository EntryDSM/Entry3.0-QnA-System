const auth = require('../auth');

module.exports = (data, io, socket) => {
  const { key } = data;
  if (auth.isAdmin(key)) {
    io.clients((err, sockets) => {
      const { id } = socket;
      // TODO: 알고리즘 개선하기
      const index = sockets.findIndex(element => element === id);
      sockets.splice(index, 1);
      socket.emit(sockets);
    });
  }
};
