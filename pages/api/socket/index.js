import { Server } from "socket.io";
import executeCommands from 'child-process-es6-promise';
import pty from 'node-pty';
import os from 'os';
let io;
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
let socketCopy = null;

const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
});

ptyProcess.on('data', function(data) {
    if(socketCopy) {
        socketCopy.broadcast.emit("command-output", {status: 'success', command: 'test', output: data});
    }
});


const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log("Socket is already running");
        res.end();

    } else {
        console.log("Socket is initializing");
        io = new Server(res.socket.server);
        res.socket.server.io = io;

        // Set socket max listener
        io.sockets.setMaxListeners(20);

        // Send response after connection established
        res.end();

        io.on("connection", (socket) => {
            socket.on("command-input", (command) => {
                console.log("command-input: ", command);
                let splittedCommand = command ? command.split(" ") : "";
                let argumentsArray = splittedCommand ? splittedCommand.slice(1) : [];
                
                executeCommands.spawn(splittedCommand[0], argumentsArray, {})
                    .then((result) => {
                        if(result?.stdout) {
                            socket.broadcast.emit("command-output", {status: 'success', command: command, output: result?.stdout});
                        }
                    })
                    .catch((error) => {
                        socket.broadcast.emit("command-output", {status: 'failed', command: command, output: null, errorText: `${error?.syscall} ${error?.code}`});
                    });
            });

            socket.on("term-input", (command) => {
                console.log("term-input socket on: ", command);
                // Assign socket to socketCopy variable for access into ptyProcess
                socketCopy = socket;
                ptyProcess.write(`${command}\r`);
            });
        });
    }
};

export default SocketHandler;
