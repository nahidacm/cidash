import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Row, Col } from "antd";
import { v4 as uuidv4 } from "uuid";

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

const ConnectionForm = (props) => {
  // Props
  const { submitFunction, form, actionType } = props;

  const onFinish = async (values) => {
    // console.log('values onfinish: ', values);

    let response = await submitFunction(values);

    if (response === "success" && actionType === "create") {
      form.resetFields();
    }
  };

  return (
    <Form
      layout="vertical"
      name="connection-form"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={form}
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
      <Form.Item
        name="host"
        label="Host"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="port"
        label="Port"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="username"
        label="User Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="public_key"
        label="Public Key"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.List name="allowed_commands">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row span={24} key={key} gutter={10}>
                <Col span={11}>
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
                  <Form.Item
                    {...restField}
                    name={[name, "step_id"]}
                    initialValue={uuidv4()}
                  ></Form.Item>
                </Col>
                <Col
                  span={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MinusCircleOutlined
                    style={{ marginTop: "35%" }}
                    onClick={() => remove(name)}
                  />
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Command
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.List name="startup_commands">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row span={24} key={key} gutter={10}>
                <Col span={11}>
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
                  <Form.Item
                    {...restField}
                    name={[name, "step_id"]}
                    initialValue={uuidv4()}
                  ></Form.Item>
                </Col>
                <Col
                  span={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MinusCircleOutlined
                    style={{ marginTop: "35%" }}
                    onClick={() => remove(name)}
                  />
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Startup Command
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <div className="justify-content-center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ConnectionForm;
