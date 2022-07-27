import dynamic from "next/dynamic";

const ReactTerminalComponent = dynamic(
    () => import("../../components/ReactTerminal"),
    {
        ssr: false,
    }
);

const ReactTerminal = (props) => {
    // Props
    const { stepResults, resetStepResults } = props;

    return (
        <ReactTerminalComponent
            stepResults={stepResults}
            resetStepResults={resetStepResults}
        />
    );
};

export default ReactTerminal;
