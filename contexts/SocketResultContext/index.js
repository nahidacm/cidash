import { createContext, useEffect, useState } from "react";
import socketio from "socket.io-client";

export const SocketResultContext = createContext({});

const SocketResultContextProvider = ({ children }) => {
    // States 
    const [stepsResults, setStepsResults] = useState([]);

    const pushResultData = (commandOutput) => {
        let stepsResultCopy = [...stepsResults];
        stepsResultCopy.push(commandOutput);
        setStepsResults(stepsResultCopy);
    }


    return(
        <SocketResultContext.Provider
            value={{
                stepsResults,
                pushResultData,
            }}
        >
            {children}
        </SocketResultContext.Provider>
    );
}

export default SocketResultContextProvider;

