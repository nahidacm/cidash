import React from "react";
import { Button, Form, Input, message, Col, Row, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

export default function NewProject() {
  const addProject = async (values) => {
    const key = "updatable";
    message.loading({
      content: "Saving...",
      key,
    });
    const res = await fetch("http://localhost:3000/api/project", {
      method: "post",
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
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="introduction" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.List name="steps">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "step_title"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing step title",
                        },
                      ]}
                    >
                      <Input placeholder="Step Title" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "command"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing command",
                        },
                      ]}
                    >
                      <Input placeholder="Command" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Step
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
