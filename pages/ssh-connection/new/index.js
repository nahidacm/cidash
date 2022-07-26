import React from "react";
import { Button, Form, Input, message, Col, Row, Space } from "antd";
import ConnectionForm from "../../../components/ConnectionForm";

export default function NewConnection() {
    // Antd Constants
    const [form] = Form.useForm();

    const addConnection = async (values) => {
        const key = "updatable";
        message.loading({
            content: "Saving...",
            key,
        });

        const res = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "/api/ssh-connection",
            {
                method: "POST",
                body: JSON.stringify(values),
            }
        );

        return new Promise((resolve, reject) => {
            if (res && res?.status === 201) {
                message.success({
                    content: "Saved Successfully!",
                    key,
                    duration: 2,
                });
                resolve("success");
            } else {
                message.error({
                    content: "Error saving data!",
                    key,
                    duration: 2,
                });
                reject("failed");
            }
        });
    };

    return (
        <Row justify="center">
            <Col xs={24} sm={24} md={18} lg={16} xl={12}>
                <ConnectionForm
                    submitFunction={addConnection}
                    form={form}
                    actionType="create"
                />
            </Col>
        </Row>
    );
}
