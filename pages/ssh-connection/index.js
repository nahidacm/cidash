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
import { useRouter } from "next/router";

export default function Connections() {
  // States
  const [connections, setConnections] = useState([]);

  // Antd Constants
  const { Panel } = Collapse;
  const { Option } = Select;

  // Router
  const router = useRouter();

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/ssh-connection", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((connections) => {
        setConnections(connections);
      });
  }, []);

  const openProjectDetails = (projectId) => {
    router.push(`/ssh-connection/details/${projectId}`);
  };

  const genExtra = (item) => {
    return (
      <Space>
        <Button
          href={`/ssh-connection/edit/` + item._id}
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
        {connections.map((item, index) => {
          return (
            <Card key={index} style={{ width: "100%", marginBottom: "2%" }}>
              <Row>
                <Col xs={14}>{item.name}</Col>
                <Col xs={10}>{genExtra(item)}</Col>
              </Row>
            </Card>
          );
        })}
      </Col>
    </Row>
  );
}
