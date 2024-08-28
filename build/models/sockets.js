"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log(`Client connected: ${socket.id}`);
            socket.on('clientMsg', (data) => {
                console.log(data);
                this.io.emit('serverMsg', data); //io sends data to all sockets connected
            });
        });
    }
}
exports.default = Sockets;
