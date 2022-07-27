import React, { useState, useEffect } from "react";
import Terminal, {
    ColorMode,
    TerminalInput,
    TerminalOutput,
} from "react-terminal-ui";
import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import Ansi from "ansi-to-react";
import Convert from "ansi-to-html";
import parseAnsi from "parse-ansi";
import AU from "ansi_up";
import { ANSI } from 'ansi-text'

const Term = (props) => {
    // Props
    const { stepResults, resetStepResults } = props;

    // States
    const [colorMode, setColorMode] = useState(ColorMode.Dark);
    const [lineData, setLineData] = useState([]);

    // Socket
    let socket = io();

    // Others
    const convertAnsi = new Convert();
    const ansi_up = new AU.default;

    const onInput = (input) => {
        let ld = [...lineData];
        ld.push(<TerminalInput>{input}</TerminalInput>);
        
        if (input.toLocaleLowerCase().trim() === "clear") {
            ld = [];
            resetStepResults();
        } else if (input) {
            socket.emit("term-input", input);
        }

        setLineData(ld);
    }

    useEffect(() => {
        if(stepResults) {
            let ld = [...lineData];
            console.log('amnsi out: ', ANSI(stepResults?.output));
            
            ld.push(<TerminalOutput key={uuidv4()}>{ANSI(stepResults?.output)}</TerminalOutput>);
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
};

export default Term;
