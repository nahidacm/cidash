import { useEffect, useState } from "react";
import { Terminal } from "xterm";


const TerminalComponent = (props) => {
    // Props
    const { stepResults, socketConnected, socket } = props;

    // Socket
    const terminalObject = new Terminal();

    // Others
    let commandLine = "";

    console.log('socket in xterm: ', socket);

    useEffect(() => {
        if (socketConnected) {
          socket.on("connect", () => {
            console.log("connected in xterm");
            // socket.emit("term-input", "ls\r"); 
          });
    
          socket.on("command-output", (msg) => {
            console.log("command-output xterm: ", msg);
            if(msg) {
                write(msg?.output);
                commandLine = "";
            }
          });
        }
    
        // return(() => {
        //     setStepResults([]);
        // });
      }, [socketConnected]);


    useEffect(() => {
        terminalObject.setOption("theme", {
            background: "#252A33",
            foreground: "#A2A29F",
            fontFamily: `'Fira Mono', monospace`,
          });
    }, [terminalObject]);


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

    const start = () => {
        const container = document.getElementById("terminal-container");
        startTerminal(container, socket);
    }

    useEffect(() => {
        // Better to start on DOMContentLoaded. So, we know terminal-container is loaded
        start();
    }, []);

    return (
        <div id="terminal-container"></div>
    );
};

export default TerminalComponent;
