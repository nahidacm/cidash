import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Col,
  Row,
  Space,
  Card,
} from "antd";
import { CodeOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const Connections = (props) => {
  // Props
  const {clickedFrom} = props;

  // States
  const [connections, setConnections] = useState([]);

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

  const openTerminal = (connectionId) => {
    router.push(`/ssh-terminal/run/` + connectionId);
  }

  const genExtra = (item) => {
      return (
          <Space>
              {clickedFrom === "ssh-terminal" ? (
                  <Button
                      onClick={() => openTerminal(item._id)}
                      icon={<EditOutlined />}
                  >
                      Run Terminal
                  </Button>
              ) : (
                  <Button
                      href={`/ssh-connection/edit/` + item._id}
                      icon={<EditOutlined />}
                  >
                      Edit
                  </Button>
              )}
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

export default Connections;
