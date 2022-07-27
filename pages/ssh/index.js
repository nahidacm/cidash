import dynamic from 'next/dynamic';

// const TerminalComponent = dynamic(() => import('../../components/TerminalComponent'), {
//     ssr: false
// });

const ExTerminalComponent = dynamic(() => import('../../components/ExTerminalComponent'), {
    ssr: false
});

const Terminal = (props) => {
    const {stepResults} = props;

    console.log('stepResults parent: ', stepResults);
    

    return (
        <div className="App" style={{ background: "" }}>
            {/* <TerminalComponent /> */}
            <ExTerminalComponent stepResults={stepResults} />
        </div>
    );
};
 
export default Terminal;
