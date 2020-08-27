const net = require('net');
const server = net.createServer(socket => {
    socket.once('data', data => {
        socket.write(data + 'echo..');
    });
});

server.listen(8888);