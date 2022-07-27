import dynamic from 'next/dynamic';

// const TerminalComponent = dynamic(() => import('../../components/TerminalComponent'), {
//     ssr: false
// });

const ExTerminalComponent = dynamic(() => import('../../components/ExTerminalComponent'), {
    ssr: false
});

const Terminal = (props) => {
    const {stepResults, socket, socketConnected} = props;

    console.log('stepResults parent: ', stepResults);
    

    return (
        <div className="App" style={{ background: "" }}>
            {/* <TerminalComponent /> */}
            <ExTerminalComponent stepResults={stepResults} socket={socket} socketConnected={socketConnected} />
        </div>
    );
};
 
export default Terminal;
