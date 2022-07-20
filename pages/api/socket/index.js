import { Server } from "socket.io";
import os from 'os';
import pty from 'node-pty';

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

var ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  ptyProcess.on('data', function(data) {
    console.log('data on pty process: ', data);
    
    process.stdout.write(data);
  });


const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log("Socket is already running");
    } else {
        console.log("Socket is initializing");
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        // Send response after connection established
        res.end();

        io.on("connection", (socket) => {
            socket.on("command-input", (msg) => {
                console.log("command-input: ", msg);
                ptyProcess.write(msg);

                socket.broadcast.emit("command-output", msg);
            });
        });
    }
};

export default SocketHandler;
