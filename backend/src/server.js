const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes.js');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {

    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

});

mongoose.connect('mongodb+srv://higor:higor@omnistack-hkjee.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use((req , res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})
// GET, POST , PUT ,DELETE

// req.query  = acessar query params( para filtros)
// req.params = acessar rout params ( para edicao e delete)
// req.body = acessar corpo da requisicao(para criacao, edicao)
app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);



server.listen(3333);