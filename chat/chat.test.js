require('dotenv').config();
const assert = require('assert');
const connectedUsers = require('./connectedUsers');
const messageQueue = require('./messageQueue');

describe('Chat module test', () => {
  describe('connectedUsers module', () => {
    const id = 'test id';
    it('isAdmin', () => {
      connectedUsers.addUser(id, process.env.ADMIN_KEY);
      const result = connectedUsers.isAdmin(id);
      connectedUsers.removeUser(id);
      assert.equal(result, true);
    });
    it('addUser', () => {
      connectedUsers.addUser(id, 'test key');
      const result = connectedUsers.getKey(id);
      connectedUsers.removeUser(id);
      assert.equal(result, 'test key');
    });
    it('removeUser', () => {
      const result = connectedUsers.getKey('not in');
      assert.equal(result, undefined);
    });
    it('getKey', () => {
      connectedUsers.addUser(id, 'test key');
      const result = connectedUsers.getKey(id);
      assert.equal(result, 'test key');
    });
  });
  describe('messageQueue module', () => {
    beforeEach(() => {
      messageQueue.addMessage('test key', 'test msg');
    })
    it('addMessage', () => {
      const result = messageQueue.getMessage('test key');
      messageQueue.getMessage('test key');
      assert.deepEqual(result, ['test msg']);
    });
    it('getMessage', () => {
      const result = messageQueue.getMessage('test key');
      assert.deepEqual(result, ['test msg']);
    });
    it('existMessage', () => {
      const result = messageQueue.existsMessage('test key');
      assert.equal(result, true);
    });
  });
});
