import { Socket } from "socket.io";

class Sockets {
    io: Socket;

    constructor( io: Socket ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket: Socket) => {
            console.log(`Client connected: ${socket.id}`);
            
            socket.on('clientMsg', (data) => {
                console.log(data);

                this.io.emit('serverMsg', data); //io sends data to all sockets connected
            });
        });
    }


}

export default Sockets;