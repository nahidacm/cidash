import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Steps, Row, Col, Card, Button } from "antd";
import { CaretRightOutlined } from '@ant-design/icons';
import io from 'socket.io-client';

const ProjectDetails = (props) => {
    // Props
    const { stepResults, resetStepResults} = props;

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
        if (router.isReady) {
            fetch(
                process.env.NEXT_PUBLIC_BASE_URL + "/api/projects/" + projectid,
                {
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((response) => {
                    setProjectData(response);
                });
        }
    }, [router.isReady]);

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
        if (steps && startExecute) {
            if (!stepResults) {
                let poppedFirstElement = steps.shift();

                if (poppedFirstElement) {
                    socket.emit("command-input", poppedFirstElement?.command);
                } else {
                    setStartExecute(false);
                    resetStepResults();
                }
            } else {
                if (stepResults?.status === "success") {
                    let poppedFirstElement = steps.shift();

                    if (poppedFirstElement) {
                        socket.emit(
                            "command-input",
                            poppedFirstElement?.command
                        );
                    } else {
                        setStartExecute(false);
                        resetStepResults();
                    }
                } else {
                    setStartExecute(false);
                    resetStepResults();

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

    const genExtra = () => {
        return (
            <>
                <Button onClick={executeCommands} icon={<CaretRightOutlined />}>
                    Run Commands
                </Button>
            </>
        );
    };


    return (
        <Row justify="center">
            <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                <Card
                    title={projectData?.name}
                    extra={genExtra()}
                    style={{ width: "100%", marginBottom: "2%" }}
                >
                    <p>{projectData?.description}</p>
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
                                            returnStepTitle(item?.status) ===
                                            "Finished"
                                                ? "finish"
                                                : returnStepTitle(
                                                      item?.status
                                                  ) === "Failed"
                                                ? "error"
                                                : null
                                        }
                                    />
                                );
                            })}
                    </Steps>
                </Card>
            </Col>
        </Row>
    );
}
 
export default ProjectDetails;