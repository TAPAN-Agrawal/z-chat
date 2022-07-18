//node server
const port = (9900);
const io = require('socket.io')(process.env.PORT || port );
const users = {};


io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("new user",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
})
