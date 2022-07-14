import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message, Col, Row, Space } from "antd";

import ProjectForm from "../../components/ProjectForm";

export default function EditProject() {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    if (router.isReady) {

        fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/projects/'+id, {method: 'GET'})
        .then((res) => res.json())
        .then((project) => {
          setProject(project)

          form.setFieldsValue(project);
          
        //   setLoading(false)
        })

    }
}, [router.isReady])

  const updateProject = async (values) => {
    const key = "updatable";
    message.loading({
      content: "Saving...",
      key,
    });
    const res = await fetch("http://localhost:3000/api/projects/" + id, {
      method: "PATCH",
      body: JSON.stringify(values),
    });

    message.success({
      content: "Updated Successfully!",
      key,
      duration: 2,
    });
  };

  const onFinish = (values) => {
    updateProject(values);
    console.log(values);
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={18} lg={16} xl={12}>
        <ProjectForm form={form} onFinish={onFinish} />
      </Col>
    </Row>
  );
}
