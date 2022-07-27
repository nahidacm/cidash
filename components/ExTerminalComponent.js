import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Terminal } from "xterm";


const SSHComponent = (props) => {
    // Props
    const { stepResults, socketConnected, socket } = props;

    // States
    const [commandText, setCommandText] = useState("test");

    // Socket
    // let socket = io();
    const terminalObject = new Terminal();

    console.log('terminalObject: ', terminalObject);
    console.log('socket in xterm: ', socket);
    console.log('stepResults: ', stepResults);
    

    let commandLine = "";

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
            background: "#202B33",
            foreground: "#F5F8FA"
          });
    }, [terminalObject]);

    // useEffect(() => {
    //     socket.on("command-output", (msg) => {
    //         console.log("command-output in x: ", msg);
    //         // setStepResults(msg);
    //     });
    // }, [socket]);
    

    const startListening = () => {
        terminalObject.onKey((key, event) => {
            console.log('key: ', key);
            console.log('event: ', event);
            
            const eventCode = key?.domEvent?.keyCode;
            console.log('eventCode: ', eventCode);

            const unAcceptedCodes = [9, 33, 34, 39, 38, 37, 40];
            

            if(eventCode === 13) {
                // ENTER
                console.log('enter');
                sendInput(commandLine);
                // prompt();
                commandLine = "";
            }
            else if(eventCode === 8) {
                // DELETE
                console.log('delete');
                commandLine = commandLine.slice(0, -1);
                write('\b \b');
            }
            else {
                // ADD
                console.log('add');
                commandLine+=key.key;
                write(key.key);
            }
        });
        
        // socket.on("command-output", data => {
        //   // When there is data from PTY on server, print that on Terminal.
        //   console.log('command-output xterm: ', data);
          
        //   write(data);
        // });

    // terminalObject.onData(data => sendInput(data));
    }

    const write = (text) =>  {
        console.log('write text: ', text);
        terminalObject.write(text);
    }

    const prompt = () => {
        terminalObject.write(`\r\n$ `);
    }

    const sendInput = (input) => {
        console.log('data in sendInput: ', input);
        socket.emit("term-input", input);
    }

    const attachTo = (container) => {
        console.log('container in attachTo: ', container);
        terminalObject.open(container);
        // Default text to display on terminal.
        terminalObject.write("Terminal Connected");
        terminalObject.write("");
        prompt();
    }

    const clear = () => {
        terminalObject.clear();
    }
    
    

    function startTerminal(container, socket) {
        // Create an xterm.js instance (TerminalUI class is a wrapper with some utils. Check that file for info.)
        console.log('container: ', container);
        console.log('socket: ', socket);
        
        
        // const terminal = new TerminalUI(socket);

        // Attach created terminal to a DOM element.
        attachTo(container);

        // When terminal attached to DOM, start listening for input, output events.
        // Check TerminalUI startListening() function for details.
        startListening();
    }

    function start() {
        const container = document.getElementById("terminal-container");
        // Connect to socket and when it is available, start terminal.
        
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

export default SSHComponent;
