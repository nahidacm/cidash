import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message, Col, Row, Space } from "antd";
import ConnectionForm from "../../../components/ConnectionForm";

export default function EditConnection() {
    // States
    const [connection, setConnection] = useState(null);

    // Router
    const router = useRouter();
    const { projectid } = router.query;

    // Antd Constants
    const [form] = Form.useForm();

    useEffect(() => {
        if (router.isReady) {
            fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/ssh-connection/" + projectid, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((connection) => {
                    setConnection(connection);

                    form.setFieldsValue(connection);
                });
        }
    }, [router.isReady]);

    const updateConnection = async (values) => {
        const key = "updatable";
        message.loading({
            content: "Saving...",
            key,
        });

        const res = await fetch("http://localhost:3000/api/ssh-connection/" + projectid, {
            method: "PATCH",
            body: JSON.stringify(values),
        });

        return new Promise((resolve, reject) => {
            if (res) {
                message.success({
                    content: "Updated Successfully!",
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
                    submitFunction={updateConnection}
                    form={form}
                    actionType="edit"
                />
            </Col>
        </Row>
    );
}
