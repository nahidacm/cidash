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

const UserVariableForm = (props) => {
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
      name="project-form"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={form}
    >
      <Form.Item
        type="hidden"
        name="user_id"
        initialValue={uuidv4()}
      ></Form.Item>

      <Row span={24} gutter={10}>
        <Col span={11}>
          <Form.Item
            name="key"
            rules={[
              {
                required: true,
                message: "Missing Key",
              },
            ]}
          >
            <Input placeholder="Key" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            name="value"
            rules={[
              {
                required: true,
                message: "Missing Value",
              },
            ]}
          >
            <Input placeholder="Value" />
          </Form.Item>
        </Col>
        <Col
          span={2}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        ></Col>
      </Row>

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

export default UserVariableForm;
