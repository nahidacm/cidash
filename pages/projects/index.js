import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Col,
  Row,
  Space,
  Collapse,
  Select,
} from "antd";
import { MinusCircleOutlined, PlusOutlined, PlaySquareOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router'


export default function Projects() {
    // States
    const [projects, setProjects] = useState([]);

    // Antd Constants
    const { Panel } = Collapse;
    const { Option } = Select;

    // Router
    const router = useRouter();


    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/projects", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((projects) => {
                setProjects(projects);
            });
    }, []);

    const openProjectDetails = (projectId) => {
        router.push(`/projects/details/${projectId}`);
    }

    const genExtra = (item) => {
        console.log('item: ', item);
        
        let steps = item?.steps && item?.steps?.length>0 ? item?.steps : null;

        return(
            <>
            <PlaySquareOutlined
                onClick={() => openProjectDetails(item._id)}
            />
            <Button
                type="text"
                href={`/projects/edit/` + item._id}
                icon={<EditOutlined />}
            />
        </>
        );
    }

    return (
        <Row justify="center">
            <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                <Collapse>
                    {projects.map((item, index) => {
                        return (
                            <Panel
                                header={<h4>{item.name}</h4>}
                                key={index}
                                extra={genExtra(item)}
                            >
                                <div>{item.description}</div>
                            </Panel>
                        );
                    })}
                </Collapse>
            </Col>
        </Row>
    );
}
