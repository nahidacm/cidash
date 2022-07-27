import dynamic from "next/dynamic";

const TerminalComponent = dynamic(
    () => import("../../components/TerminalComponent"),
    {
        ssr: false,
    }
);

const Terminal = (props) => {
    const { stepResults, socket, socketConnected } = props;

    return (
        <div className="App" style={{ background: "" }}>
            <TerminalComponent
                stepResults={stepResults}
                socket={socket}
                socketConnected={socketConnected}
            />
        </div>
    );
};

export default Terminal;
