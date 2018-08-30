const connectedUsers = new Map(); // socket.id -> key

const isAdmin = function checkAdmin(id) {
  return connectedUsers.has(id)
    && (connectedUsers.get(id) === process.env.ADMIN_KEY);
};

const addUser = function add(id, key) {
  connectedUsers.set(id, key);
};

const removeUser = function remove(id) {
  connectedUsers.delete(id);
};

const getKey = function fromId(id) {
  return connectedUsers.get(id);
};

module.exports = {
  isAdmin,
  getKey,
  addUser,
  removeUser,
};
