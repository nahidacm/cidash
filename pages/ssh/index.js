import io from "socket.io-client";
import { useEffect } from "react";
import { Terminal } from "xterm";


const SSHComponent = () => {
    // Socket
    let socket = io();
    const terminalObject = new Terminal();
    console.log('terminalObject: ', terminalObject);

    useEffect(() => {
        terminalObject.setOption("theme", {
            background: "#202B33",
            foreground: "#F5F8FA"
          });
    }, [terminalObject]);

    const startListening = () => {
        terminalObject.onData((data) => {
            console.log('terminal ondata: ', data);
            
            sendInput(data);
        });
    
        
        // socket.on("xterm-output", data => {
        //   // When there is data from PTY on server, print that on Terminal.
        //   write(data);
        // });
    }

    const write = (text) =>  {
        terminalObject.write(text);
    }

    const prompt = () => {
        terminalObject.write(`\r\n$ `);
    }

    const sendInput = (input) => {
        console.log('data in sendInput: ', input);
        
        socket.emit("command-input", input);
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
