export const BASE_URL = "http://localhost:3000";
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Col,
  Row,
  Space,
  Collapse,
  Select,
  Table,
  Tag,
  Card,
  Image,
  Popconfirm,
  FormOutlined,
  DeleteOutlined,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  PlaySquareOutlined,
  EditOutlined,
} from "@ant-design/icons";

import io from "socket.io-client";

const deleteUSer = async (event) => {
  fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users/" + id, {
    method: "DELETE",
  });
};

export default function Users() {
  // States
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [rowData, setRowData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [flag, setFlag] = useState("");

  const [loader, setLoader] = useState(false);

  // Antd Constants
  const { Panel } = Collapse;
  const { Option } = Select;

  const refetch = () => {
    setRefresh(refresh + 1);
  };

  const handleDelete = (e) => {
    fetch("http://localhost:3000/api/users/" + e.variables.deleteUserId, {
      method: "DELETE",
    });
    message.success("User Deleted Successfully");
    refetch();
  };

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
        console.log(users);
      });
  }, [refresh]);

  const cancel = (e) => {
    // console.log(e);
    // message.error("Click on No");
  };

  useEffect(() => {
    setLoader(true);
  }, [refresh]);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Image",
      key: "image",
      align: "center",
      render(row) {
        if (row?.image) {
          return (
            <Image
              width={80}
              alt="Image"
              preview={false}
              src={BASE_URL + "/uploads/" + row?.image.file.name}
            />
          );
        } else {
          return <Tag color={"warning"}>No Image</Tag>;
        }
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setVisible(true);
              setFlag("Edit");
              setRowData(record);
            }}
            href={`/users/edit?id=` + record._id}
          >
            Edit {record.name}
          </a>

          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={(e) => {
              handleDelete({
                variables: {
                  deleteUserId: record?._id,
                },
              });
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a href={`/users/delete?id=` + record._id}>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <section className="content-main">
      <div className="content-header">
        <div>
          <h2 className="content-title card-title">User List</h2>
        </div>
        <div></div>
      </div>

      <div className="card mb-4">
        <Card>
          <Table
            scroll={{ x: true }}
            size="middle"
            columns={columns}
            refresh={refresh}
            dataSource={users || []}
          />
        </Card>
      </div>
    </section>
  );
}
