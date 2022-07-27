import {
  useEffect,
  useState,
  useContext,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import {
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileDoneOutlined,
  DisconnectOutlined,
  ApartmentOutlined
} from "@ant-design/icons";
import { PageHeader, Layout, Menu } from "antd";
import styles from "../styles/Template.module.less";
import { useRouter } from "next/router";
import io from "socket.io-client";

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    title: label,
    icon,
    children,
  };
}

const items = [
  getItem("Project", "1", <PieChartOutlined />, [
    getItem("Add New", "/projects/new"),
    getItem("Projects", "/projects"),
  ]),
  getItem("Option 2", "4", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Add New", "/users/new"),
    getItem("Users", "/users"),
  ]),
  getItem("User Variable", "sub3", <ApartmentOutlined />, [
    getItem("Add New", "/variables/new"),
    getItem("Variables", "/variables"),
  ]),

  getItem("SSH connection Management", "5", <DisconnectOutlined />, [
    getItem("Add New", "/ssh-connection/new"),
    getItem("Connections", "/ssh-connection"),
  ]),

  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "8"),
    getItem("Team 2", "9"),
  ]),
  getItem("Files", "10", <FileDoneOutlined />),
  getItem("Terminal", "/term", <PieChartOutlined />),
  getItem("Xterm", "/ssh", <DisconnectOutlined />),
];

const Template = ({ children }) => {
  // States
  const [collapsed, setCollapsed] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [stepResults, setStepResults] = useState(null);

  // Router
  const router = useRouter();
  const { pathname } = router;

  // Antd Constants
  const { Header, Content, Footer, Sider } = Layout;

  // Socket
  let socket = io();

  const turnSocketOn = async () => {
    let response = await fetch("/api/socket");

    if (response?.status === 200) {
      setSocketConnected(true);
    }
  };

  useEffect(() => {
    // Turn socket connection on on first page load
    turnSocketOn();
  }, []);

  useEffect(() => {
    if (socketConnected) {
      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("command-output", (msg) => {
        console.log("command-output: ", msg);
        setStepResults(msg);
      });
    }

    // return(() => {
    //     setStepResults([]);
    // });
  }, [socketConnected]);

  useEffect(() => {
    // Set title when first load and on home (/)
    if (pathname === "/") {
      setHeaderTitle("Dashboard");
    }
  }, [pathname]);

  const onClick = ({ item, key, keyPath, domEvent }) => {
    router.push(key);
    setHeaderTitle(item?.props?.title);
  };

  const goBack = () => {
    router.push("/");
    setHeaderTitle("Dashboard");
  };

  const resetStepResults = () => {
    setStepResults(null);
  };

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { stepResults, resetStepResults });
    }
    return child;
  });

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className={styles.logo} />
        <Menu
          onClick={onClick}
          theme="dark"
          defaultSelectedKeys={["/projects/new"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-header"
          style={{
            padding: 0,
            background: "#dedede",
          }}
        >
          <PageHeader
            className="site-page-header"
            onBack={() => goBack()}
            title={headerTitle}
          />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {childrenWithProps}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          CIDash ©{new Date().getFullYear()} Created by{" "}
          <a
            href="https://www.sslwireless.com/"
            target="_blank"
            rel="noreferrer"
          >
            SSL Wireless
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Template;
