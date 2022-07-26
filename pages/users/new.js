export const BASE_URL = "http://localhost:3000";
import { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { useUser } from "../../lib/hooks";
import { Button, Form, Input, message, Col, Row, Space } from "antd";
import UserForm from "../../components/UserForm";

export default function UserPage() {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState("");
  const [form] = Form.useForm();

  const addUser = async (values) => {
    const key = "updatable";
    message.loading({
      content: "Saving...",
      key,
    });

    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/users",
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
        <UserForm submitFunction={addUser} form={form} actionType="create" />
      </Col>
    </Row>
  );
}
