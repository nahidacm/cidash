import React, { useEffect, useState } from "react";
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
import io from 'socket.io-client';


export default function Projects() {
    // States
    const [projects, setProjects] = useState([]);

    // Antd Constants
    const { Panel } = Collapse;
    const { Option } = Select;

    // Other
    let socket = io();

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/projects", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((projects) => {
                setProjects(projects);
                //   setLoading(false)
            });
    }, []);

    const executeCommands = (event) => {
        console.log('event: ', event);
        // event.preventDefault();

        socket.emit('input-change', "test")
    }

    const genExtra = (item) => (
        <>
            <PlaySquareOutlined
                onClick={(event) => executeCommands(event)}
            />
            <Button
                type="text"
                href={`/projects/edit?id=` + item._id}
                icon={<EditOutlined />}
            />
        </>
    );

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
