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

const countAdmin = function count() {
  let i = 0;
  connectedUsers.forEach((value) => {
    if (value === process.env.ADMIN_KEY) {
      i += 1;
    }
  });
  return i;
};

const getRoomIdFromKey = function fromKey(key) {
  let result = null;
  connectedUsers.forEach((value, id) => {
    if (key === value) {
      result = id;
    }
  });
  return result;
};

module.exports = {
  isAdmin,
  getKey,
  addUser,
  removeUser,
  countAdmin,
  getRoomIdFromKey,
};
