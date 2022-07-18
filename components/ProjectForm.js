import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Row, Col } from "antd";

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };


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
  
const ProjectForm = (props) => {
    // Props
    const { submitFunction, form, actionType } = props;

    const onFinish = async (values) => {
        let response = await submitFunction(values);

        if (response === "success" && actionType === 'create') {
            form.resetFields();
        }
    };

    return (
        <Form
            // {...layout}
            layout="vertical"
            name="project-form"
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

            <Form.Item name="description" label="Description">
                <Input.TextArea />
            </Form.Item>

            <Form.List name="steps">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row span={24} key={key} gutter={10}>
                                <Col span={11}>
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
                                </Col>
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
                                Add Step
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

export default ProjectForm;
