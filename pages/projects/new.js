import React from "react";
import { Button, Form, Input, message, Col, Row, Space } from "antd";
import ProjectForm from "../../components/ProjectForm";


/* eslint-disable no-template-curly-in-string */

export default function NewProject() {

  const addProject = async (values) => {
    const key = "updatable";
    message.loading({
      content: "Saving...",
      key,
    });
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/projects", {
      method: "POST",
      body: JSON.stringify(values),
    });

    message.success({
      content: "Saved Successfully!",
      key,
      duration: 2,
    });
  };

  const onFinish = (values) => {
    addProject(values);
    console.log(values);
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={18} lg={16} xl={12}>
        <ProjectForm onFinish={onFinish} />
      </Col>
    </Row>
  );
}
