import express, { Express } from 'express';
import { Server as HttpServer } from 'http';
import { Socket } from 'socket.io';

class Server {
    app: Express;
    port: number;
    server: HttpServer;
    io: Socket;

    constructor() {

        //express server
        this.app = express();
        this.port = 9191;

        //http server
        this.server = require('http').createServer(this.app);

        //Socket server config
        this.io = require('socket.io')(this.server, { /* configs */ });
    }

    middlewares() {
        this.app.use(express.static(__dirname + '/../public'));
    }

    socketIOClients() {
        this.io.on('connection', (socket: Socket) => {
            console.log(`Client connected: ${socket.id}`);
            
            socket.on('clientMsg', (data) => {
                console.log(data);

                this.io.emit('serverMsg', data); //io sends data to all sockets connected
            });
        });
    }

    execute() {

        this.middlewares();
        this.socketIOClients();

        this.server.listen(this.port, () => {
            console.log('Server Running on port 9191...');
        })
    }

}

export default Server;