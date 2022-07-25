import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message, Col, Row, Space } from "antd";
import UserForm from "../../components/UserForm";

export default function DeleteUser() {
  // States
  const [user, setUser] = useState(null);

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Antd Constants
  const [form] = Form.useForm();

  useEffect(() => {
    if (router.isReady) {
      fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((user) => {
          setUser(user);

          form.setFieldsValue(user);

          //   setLoading(false)
        });
    }
  }, [router.isReady]);

  const updateUser = async (values) => {
    const key = "updatable";
    message.loading({
      content: "Saving...",
      key,
    });

    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/users/" + id,
      {
        method: "DELETE",
        body: JSON.stringify(values),
      }
    );

    return new Promise((resolve, reject) => {
      if (res) {
        console.log("res: ", res);

        message.success({
          content: "Deleted Successfully!",
          key,
          duration: 2,
        });
        resolve("success");
      } else {
        message.error({
          content: "Error deleting data!",
          key,
          duration: 2,
        });
        reject("failed");
      }
    });
  };


}
