import express, { Express } from 'express';
import { Server as HttpServer } from 'http';
import { Socket } from 'socket.io';
import Sockets from './sockets';
import cors from 'cors';

class Server {
    app: Express;
    port: string;
    server: HttpServer;
    io: Socket;

    constructor() {

        //express server
        this.app = express();
        this.port = `${process.env.PORT}`;

        //http server
        this.server = require('http').createServer(this.app);

        //Socket server config
        this.io = require('socket.io')(this.server, {
            /* cors: {
                origin: 'https://socket-io-lilac.vercel.app/',
                methods: ['GET', 'POST']
            } */
        });
    }

    middlewares() {
        this.app.use(express.static(__dirname + '/../public'));
    }

    socketIOConfig() {
        new Sockets(this.io);
    }

    execute() {

        this.middlewares();
        this.socketIOConfig();

        this.server.listen(this.port, () => {
            console.log('Server Running on port 9191...');
        })
    }

}

export default Server;