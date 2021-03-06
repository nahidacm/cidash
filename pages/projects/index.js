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
  Card,
} from "antd";
import { CodeOutlined, EditOutlined } from "@ant-design/icons";
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
        return (
            <Space>
                <Button
                    onClick={() => openProjectDetails(item._id)}
                    icon={<CodeOutlined />}
                >
                    Details
                </Button>
                <Button
                    href={`/projects/edit/` + item._id}
                    icon={<EditOutlined />}
                >
                    Edit
                </Button>
            </Space>
        );
    };

    return (
        <Row justify="center">
            <Col xs={24} sm={24} md={24} lg={16} xl={12}>
                {projects.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            style={{ width: "100%", marginBottom: "2%" }}
                        >
                           <Row>
                            <Col xs={14}>
                                {item.name}
                            </Col>
                            <Col xs={10}>
                                {genExtra(item)}
                            </Col>
                           </Row>
                        </Card>
                    );
                })}
            </Col>
        </Row>
    );
}
