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

const deleteUserVariable = async (event) => {
  fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/user-variable/" + id, {
    method: "DELETE",
  });
};

export default function UserVariables() {
  // States
  const [userVariables, setUserVariables] = useState([]);
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
    fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        "/api/user-variable/" +
        e.variables.deleteUserId,
      {
        method: "DELETE",
      }
    );
    message.success("User Variable Deleted Successfully");
    refetch();
  };

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/user-variable", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((userVariables) => {
        setUserVariables(userVariables);
        console.log(userVariables);
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
      title: "Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "val",
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
            href={`/variables/edit?id=` + record._id}
          >
            Edit {record.name}
          </a>

          <Popconfirm
            title="Are you sure to delete this?"
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
            <a href={`/variables/delete?id=` + record._id}>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <section className="content-main">
      <div className="content-header">
        <div>
          <h2 className="content-title card-title">Variable List</h2>
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
            dataSource={userVariables || []}
          />
        </Card>
      </div>
    </section>
  );
}
