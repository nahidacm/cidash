import React, {useEffect, useState} from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { Resizable } from "re-resizable";
import ResizeObserver from "react-resize-observer";
import c from "ansi-colors";

let term;
const fitAddon = new FitAddon();

const TerminalComponent = () => {
    // States
    const [commandText, setCommandText] = useState([]);

    console.log('commandText state: ', commandText);
    

    const prompt = () => {
        var shellprompt = "$ ";
        term.write("\r\n" + shellprompt);
    };

    useEffect(() => {
        term = new Terminal({
            convertEol: true,
            fontFamily: `'Fira Mono', monospace`,
            fontSize: 15,
            fontWeight: 900,
            // rendererType: "dom" // default is canvas
        });

        //Styling
        term.setOption("theme", {
            background: "black",
            foreground: "white",
        });

        // Load Fit Addon
        term.loadAddon(fitAddon);

        // Open the terminal in #terminal-container
        term.open(document.getElementById("xterm-one"));
        console.log("comp did");

        //Write text inside the terminal
        term.write(
            c.magenta("I am ") + c.blue("Blue") + c.red(" and i like it")
        );

        // Make the terminal's size and geometry fit the size of #terminal-container
        fitAddon.fit();

        term.onKey((key) => {
            console.log('key: ', key);
            let letter = key?.key;
            console.log('letter: ', typeof letter);
            
           let commandTextCopy = [...commandText];
           commandTextCopy.push(letter);
            
            setCommandText(commandTextCopy);
            
            const char = key.domEvent.key;
            if (char === "Enter") {
                prompt();
            } else if (char === "Backspace") {
                term.write("\b \b");
            } else {
                term.write(char);
            }
        });

        prompt();
    }, []);
    return (
        <>
            <h1>Xterm.js</h1>
            <Resizable
                width={350}
                height={350}
                style={{
                    background: "firebrick",
                    padding: "0.4em",
                    margin: "1em",
                }}
            >
                <div
                    id="xterm-one"
                    style={{ height: "100%", width: "100%" }}
                />
                {/* <ResizeObserver
        onResize={rect => {
          fitAddon.fit();
          console.log("Resized. New bounds:", rect.width, "x", rect.height);
        }}
        onPosition={rect => {
          console.log("Moved. New position:", rect.left, "x", rect.top);
        }}
      /> */}
            </Resizable>
        </>
    );
}
 
export default TerminalComponent;
