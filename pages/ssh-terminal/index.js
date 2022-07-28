import Connections from "../ssh-connection";

const SSHTerminal = (props) => {
    return (
        <div className="App" style={{ background: "" }}>
            <Connections clickedFrom={`ssh-terminal`}/>
        </div>
    );
};

export default SSHTerminal;
