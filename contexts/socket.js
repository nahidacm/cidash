import { createContext, useEffect, useState } from "react";
import socketio from "socket.io-client";

export const SocketContext = createContext({});

const SocketContextProvider = ({ children }) => {
    // States 
    const [socket, setSocket] = useState("test");

    const assignSocketData = (data) => {
        setSocket(data);
    }

    useEffect(() => {
        let socketconnect = socketio.connect('http://localhost:3000');
        setSocket(socketconnect);
    }, []);


    return(
        <SocketContext.Provider
            value={{
                socket,
                assignSocketData,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}

export default SocketContextProvider;

