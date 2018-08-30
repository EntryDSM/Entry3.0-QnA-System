const msgList = new Map(); // key -> array(for queue)

const addMessage = function add(key, msg) {
  if (msgList.has(key)) {
    msgList.get(key).push(msg);
  } else {
    msgList.set(key, [msg]);
  }
};

const getMessage = function get(key) {
  if (!msgList.has(key)) {
    return [];
  }
  const messages = msgList.get(key);
  msgList.delete(key);
  return messages;
};

const existsMessage = function check(key) {
  return msgList.has(key) && msgList.get(key).length;
};

module.exports = {
  addMessage,
  getMessage,
  existsMessage,
};
