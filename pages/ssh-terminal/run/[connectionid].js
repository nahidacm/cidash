import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";


const SSHTerminalComponent = dynamic(
    () => import("../../../components/SSHTerminal"),
    {
        ssr: false,
    }
);

const ConnectionTerminal = (props) => {
    // Props
    const { stepResults, socket, socketConnected } = props;

    // States
    const [connectionData, setConnectionData] = useState(null);
    const [error, setError] = useState(null);

    // Router
    const router = useRouter();
    const { connectionid } = router.query;

    useEffect(() => {
        console.log('ConnectionTerminal mount');
        
        if (router.isReady) {
            fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                    "/api/ssh-connection/" +
                    connectionid,
                {
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((connection) => {
                    setConnectionData(connection);
                })
                .catch((error) => {
                    setConnectionData(null);
                    setError(error);
                });
        }
    }, [router.isReady]);

    return (
        <>
            {connectionData ? (
                <SSHTerminalComponent
                    stepResults={stepResults}
                    socket={socket}
                    socketConnected={socketConnected}
                    connectionData={connectionData}
                />
            ) : null}
        </>
    );
};

export default ConnectionTerminal;
