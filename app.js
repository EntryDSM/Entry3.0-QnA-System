require('dotenv').config();
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const auth = require('./auth');
const chat = require('./chat');


app.get('/auth', auth.authController);
io.on('connection', chat.onConnect);


server.listen(process.env.PORT);
