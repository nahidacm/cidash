export const BASE_URL = "http://localhost:3000";
export const FILE_UPLOAD_PATH = "api/users/image";

import {
  MinusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Space,
  Row,
  Col,
  message,
  Upload,
  Select,
} from "antd";
import React, { useState, useEffect } from "react";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
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

const UserForm = (props) => {
  const { rowData } = props;
  const flag = "Edit";

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [formLoading, setFormLoading] = useState(true);

  useEffect(() => {
    if (flag === "Edit") {
      rowData ? setFormLoading(false) : setFormLoading(true);
    }
  }, [rowData, flag]);

  const doRenderImageComponent = (rowData) => {
    console.log(rowData + "sdsd");
    if (rowData?.image) {
      return (
        <Form.Item name="image" style={{ marginTop: 10 }}>
          <Upload
            action={`${BASE_URL}/${FILE_UPLOAD_PATH}`}
            accept="image/jpeg, image/png, .svg"
            defaultFileList={[
              {
                status: "done",
                url: BASE_URL + `/uploads/${rowData?.image.file.name}`,
              },
            ]}
            showUploadList={{ showPreviewIcon: false }}
            listType="picture-card"
            maxCount={1}
          >
            {"+ Edit Image"}
          </Upload>
        </Form.Item>
      );
    } else {
      return (
        <Form.Item name="image" style={{ marginTop: 10 }}>
          <Upload
            action={`${BASE_URL}/${FILE_UPLOAD_PATH}`}
            accept="image/jpeg, image/png, .svg"
            defaultFileList={[
              {
                status: "done",
                url:
                  BASE_URL + "/uploads" + `/${rowData?.image.file.name}`,
              },
            ]}
            showUploadList={{ showPreviewIcon: false }}
            listType="picture-card"
            maxCount={1}
          >
            {"+ Uploadss Image"}
          </Upload>
        </Form.Item>
      );
    }
  };
  // Props
  const { submitFunction, form, actionType } = props;

  const onFinish = async (values) => {
    let response = await submitFunction(values);

    if (response === "success" && actionType === "create") {
      form.resetFields();
    }
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <Form
      // {...layout}
      layout="vertical"
      name="user-form"
      onFinish={onFinish}
      validateMessages={validateMessages}
      form={form}
    >
      <Form.Item name="full_name" label="Full Name">
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone">
        <Input />
      </Form.Item>

        <Form.Item name="image" style={{ marginTop: 10 }}>
          <Upload
            action={`${BASE_URL}/${FILE_UPLOAD_PATH}`}
            accept="image/jpeg, image/png, .svg"
            showUploadList={{
              showPreviewIcon: false,
            }}
            listType="picture-card"
            maxCount={1}
          >
            {"+ Upload Image"}
          </Upload>
        </Form.Item>
     

      <Form.Item name="user_type" label="User Type">
        <Select
          showSearch
          placeholder="Select user type"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
        </Select>
      </Form.Item>

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

export default UserForm;
