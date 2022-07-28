import { useEffect, useState, useCallback } from "react";
import { Terminal } from "xterm";


const TerminalComponent = (props) => {
    // Props
    const { stepResults, socketConnected, socket, connectionData } = props;

    // Others
    const terminalObject = new Terminal();
    let commandLine = "";

    console.log('socket in xterm: ', socket);
    console.log('connectionData: ', connectionData);
    

    useEffect(() => {
        // Render terminal on DOM on componentDidMount
        if(connectionData) {
            console.log('render terminal');

            if (terminalObject) {
                // Style the terminal
                terminalObject.setOption("theme", {
                    background: "#252A33",
                    foreground: "#A2A29F",
                    fontFamily: `'Fira Mono', monospace`,
                });

                start();
            }
        }
    }, [connectionData, start, terminalObject]);


    useEffect(() => {
        if (socketConnected && connectionData) {
            const connectionUrl = `${connectionData?.username}@${connectionData?.host}`;
            const connectionPassword = `${connectionData?.password}`;

            // Emit command to connect with server
            socket.emit(
                "term-input",
                `ssh ${connectionUrl}\r`
            );

            // Check for output commands
            socket.on("command-output", (msg) => {
                console.log("command-output xterm: ", msg);
                if (msg) {
                    if (
                        msg?.command === `ssh ${connectionUrl}\r` &&
                        msg?.status === "success" &&
                        msg?.output === `\r${connectionUrl}'s password: `
                    ) {
                        socket.emit("term-input", `${connectionPassword}\r`);
                        commandLine = "";
                    } else {
                        write(msg?.output);
                        commandLine = "";
                    }
                }
            });
        }

        // return () => {
        //     // ComponentDidUnmount
        //     console.log('comp did unmount');
        //     // Emit command to exit the server's terminal
        //     socket.emit(
        //         "term-input",
        //         `exit\r`
        //     );
        // }
    }, [socketConnected, connectionData]);

    const startListening = () => {
        terminalObject.onKey((key, event) => {
            const eventCode = key?.domEvent?.keyCode;
            const unAcceptedCodes = [9, 33, 34, 39, 38, 37, 40];

            if(eventCode === 13) {
                // ENTER
                sendInput(commandLine);
                // prompt();
                commandLine = "";
            }
            else if(eventCode === 8) {
                // DELETE
                commandLine = commandLine.slice(0, -1);
                write('\b \b');
            }
            else {
                // ADD
                commandLine+=key.key;
                write(key.key);
            }
        });
    }

    const write = (text) =>  {
        terminalObject.write(text);
    }

    const prompt = () => {
        terminalObject.write(`\r\n$ `);
    }

    const sendInput = (input) => {
        socket.emit("term-input", input);
    }

    const attachTo = (container) => {
        terminalObject.open(container);
        // Default text to display on terminal.
        terminalObject.write("Terminal Connected");
        terminalObject.write("");
        prompt();
    }

    const clear = () => {
        terminalObject.clear();
    }

    const startTerminal = (container, socket) => {
        attachTo(container);

        // When terminal attached to DOM, start listening for input, output events.
        startListening();
    }

    const start = useCallback(() => {
            const container = document.getElementById("terminal-container");
            startTerminal(container, socket);
    }, []);

    return (
        <div id="terminal-container"></div>
    );
};

export default TerminalComponent;
