import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CaretRightOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
import { Steps } from 'antd';

const ProjectDetails = (props) => {
    // Props
    const { stepResults, resetStepResults } = props;

    // States
    const [projectData, setProjectData] = useState(null);
    const [startExecute, setStartExecute] = useState(false);
    const [steps, setSteps] = useState(null);
    const [stepReturnItems, setStepReturnItems] = useState([]);

    // Router
    const router = useRouter();
    const { projectid } = router.query;

    // Other Constants
    let socket = io();

    // Antd Constants
    const { Step } = Steps;


    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/projects/" + projectid, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                console.log('response: ', response);
                setProjectData(response);
            });
    }, [projectid]);

    useEffect(() => {
        resetStepResults();
    }, []);

    useEffect(() => {
        if(projectData) {
            setSteps(projectData?.steps && projectData?.steps?.length>0 ? projectData?.steps : null);
        }
    }, [projectData]);

    const executeCommands = () => {
        setStartExecute(true);
    }

    useEffect(() => {
        if(steps && startExecute) {
            if(!stepResults) {
                let poppedFirstElement = steps.shift();
                if(poppedFirstElement) {
                    socket.emit('command-input', poppedFirstElement?.command);
                }
            }
            else {
                if(stepResults?.status === 'success') {
                    let poppedFirstElement = steps.shift();
                    if(poppedFirstElement) {
                        socket.emit('command-input', poppedFirstElement?.command);
                    }
                }
                else {
                    return;
                }
            }
        }
        
    }, [startExecute, stepResults, steps]);

    useEffect(() => {
        if(stepResults) {
            let stepReturnItemsCopy = [...stepReturnItems];
            stepReturnItemsCopy.push(stepResults);
            setStepReturnItems(stepReturnItemsCopy);
        }
    }, [stepResults]);

    const returnStepTitle = (status) => {
        if(status === 'success') {
            return 'Finished';
        }
        else if(status === 'failed') {
            return 'Failed'
        }
    }

    return (
        <>
            <div>Project Details</div>
            <CaretRightOutlined onClick={executeCommands} />
            <Steps direction="vertical" current={1}>
                {Array.isArray(stepReturnItems) &&
                    stepReturnItems?.length > 0 &&
                    stepReturnItems?.map((item, index) => {
                        return (
                            <Step
                                key={index}
                                title={returnStepTitle(item?.status)}
                                description={item?.command}
                                status={
                                    returnStepTitle(item?.status) === "Finished"
                                        ? "finish"
                                        : returnStepTitle(item?.status) ===
                                          "Failed"
                                        ? "error"
                                        : null
                                }
                            />
                        );
                    })}
            </Steps>
        </>
    );
}
 
export default ProjectDetails;