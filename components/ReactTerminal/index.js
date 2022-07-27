import React, { useState, useEffect } from "react";
import Terminal, {
    ColorMode,
    TerminalInput,
    TerminalOutput,
} from "react-terminal-ui";
import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

const ReactTerminal = (props) => {
    // Props
    const { stepResults, resetStepResults } = props;

    // States
    const [colorMode, setColorMode] = useState(ColorMode.Dark);
    const [lineData, setLineData] = useState([]);

    // Socket
    let socket = io();

    const onInput = (input) => {
        let ld = [...lineData];
        ld.push(<TerminalInput key={uuidv4()}>{input}</TerminalInput>);
        
        if (input.toLocaleLowerCase().trim() === "clear") {
            ld = [];
            resetStepResults();
        } else if (input) {
            socket.emit("command-input", input);
        }

        setLineData(ld);
    }

    useEffect(() => {
        if(stepResults) {
            let ld = [...lineData];

            ld.push(<TerminalOutput key={uuidv4()}>{stepResults?.output}</TerminalOutput>);
            setLineData(ld);
        }
    }, [stepResults]);

    useEffect(() => {
        // ComponentDidUnmount
        return () => {
            resetStepResults();
        }
    }, []);


    return (
        <div className="terminalContainer">
            <Terminal
                name="CIDash Terminal"
                colorMode={colorMode}
                onInput={onInput}
            >
                {lineData}
            </Terminal>
        </div>
    );
}
 
export default ReactTerminal;