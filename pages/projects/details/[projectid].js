import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CaretRightOutlined } from '@ant-design/icons';
import io from 'socket.io-client';

const ProjectDetails = (props) => {
    // Props
    const { stepResults, resetStepResults } = props;

    // States
    const [projectData, setProjectData] = useState(null);

    // Router
    const router = useRouter();
    const { projectid } = router.query;

    // Other Constants
    let socket = io();

    console.log('projectid: ', projectid);
    console.log('stepResults prop child: ', stepResults);
    

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/projects/" + projectid, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((response) => {
                console.log('response: ', response);
                setProjectData(response);
                
                // setProject(project);

                // form.setFieldsValue(project);
            });
    }, [projectid]);

    useEffect(() => {
        resetStepResults();
    }, []);

    const executeCommands = () => {
        // event.preventDefault();
        const steps = projectData?.steps && projectData?.steps?.length>0 ? projectData?.steps : null;

        console.log('steps: ', steps);
        
        steps && steps?.forEach((stepItem, index) => {
            socket.emit('command-input', stepItem?.command);
        });
    }

    return (
        <>
            <div>Project Details</div>
            <CaretRightOutlined 
                onClick={executeCommands}
            />
            {stepResults && stepResults.map((resultItem, index) => {
                {console.log("resultItem: ", resultItem)}
                return(<div key={index}>{resultItem}</div>)
            })}
        </>
    );
}
 
export default ProjectDetails;