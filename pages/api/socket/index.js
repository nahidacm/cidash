import { Server } from "socket.io";
import executeCommands from 'child-process-es6-promise';
let io;

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log("Socket is already running");
        res.end();

    } else {
        console.log("Socket is initializing");
        io = new Server(res.socket.server);
        res.socket.server.io = io;

        // Send response after connection established
        res.end();

        io.on("connection", (socket) => {
            socket.on("command-input", (command) => {
                console.log("command-input: ", command);
                // ptyProcess.write(`${msg}\r`);
                executeCommands.spawn(command, [], {})
                    .then((result) => {
                        if(result?.stdout) {
                            console.log('result: ', result);
                            socket.broadcast.emit("command-output", `command success: ${command}`);
                        }
                    })
                    .catch((error) => {
                        console.log('Error: ', `${error?.syscall} ${error?.code}`);
                        socket.broadcast.emit("command-output", `command failed: ${error?.syscall} ${error?.code}`);
                    });
            });
        });
    }
};

export default SocketHandler;
