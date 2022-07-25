import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message, Col, Row, Space } from "antd";
import UserEditForm from "../../components/UserEditForm";

export default function EditUser() {
  // States
  const [user, setUser] = useState(null);

  const [rowData, setRowData] = useState(null);
  const [refresh, setRefresh] = useState(0);

  // Router
  const router = useRouter();
  const { id } = router.query;

  // Antd Constants
  const [form] = Form.useForm();

  const refetch = () => {
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    if (router.isReady) {
      fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users/" + id, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((user) => {
            console.log("user", user);
          setUser(user);
          setRowData(user);
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
        method: "PATCH",
        body: JSON.stringify(values),
      }
    );

    return new Promise((resolve, reject) => {
      if (res) {
        console.log("res: ", res);

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
        <UserEditForm
          submitFunction={updateUser}
          form={form}
          rowData={rowData}
          refresh={refresh}
          actionType="edit"
        />
      </Col>
    </Row>
  );
}
