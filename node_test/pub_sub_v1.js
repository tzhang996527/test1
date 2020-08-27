const events = require('events');
const net = require('net');

const channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};

channel.setMaxListeners(50);

channel.on('welcome', function(client,message ){
    client.write(message);
});

channel.on('join', function(id, client){

    const welcome = `
        Welcome!
          Guests online: ${this.listeners('broadcast').length}
    `;

    client.write(`${welcome}`);

    this.clients[id] = client;
    this.subscriptions[id] = (senderId, message) => {
        if(id != senderId){
            this.clients[id].write(message);
        }
    };

    this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function(id){
    channel.removeListener(
        'broadcast', this.subscriptions[id]
    );
    channel.emit('broadcast', id, `${id} has left the chatroom.\n`);
});

channel.on('shutdown', () => {
    channel.emit('broadcast', '', `The server has shut down.\n`);
    channel.removeAllListeners('broadcast');
});

const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    channel.emit('welcome', client, `Welcome to chatroom.\n`);
    channel.emit('broadcast',id , `${id} has join the chatroom.\n`);
    channel.emit('join', id, client);
    client.on('data', data => {
        data = data.toString();
        if (data === 'shutdown\r\n') {
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data);
    });
    client.on('close', () => {
        channel.emit('leave', id);
    });

});

server.listen(8888);