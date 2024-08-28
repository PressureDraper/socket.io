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
        this.io = require('socket.io')(this.server, /* {
            cors: {
                origin: 'https://socketio-production-02ed.up.railway.app/',
                methods: ['GET', 'POST']
            }
        } */);
    }

    middlewares() {
        this.app.use(express.static(__dirname + '../../../public'));

        this.app.use(cors({
            origin: '*', // Permitir todas las fuentes. Ajusta según sea necesario.
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
    }

    socketIOConfig() {
        new Sockets(this.io);
    }

    execute() {

        this.middlewares();
        this.socketIOConfig();

        this.server.listen(this.port, () => {
            console.log(`Server Running on port ${this.port}...`);
        })
    }

}

export default Server;