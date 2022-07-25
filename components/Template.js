import {
    PieChartOutlined,
    UserOutlined,
    DesktopOutlined,
    TeamOutlined,
    FileDoneOutlined,
} from "@ant-design/icons";
import { PageHeader, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import styles from "../styles/Template.module.less";
const { Header, Content, Footer, Sider } = Layout;
import { useRouter } from "next/router";

function getItem(label, key, icon, children) {
    return {
        label,
        key,
        title : label,
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
    getItem("Team", "sub2", <TeamOutlined />, [
        getItem("Team 1", "8"),
        getItem("Team 2", "9"),
    ]),
    getItem("Files", "10", <FileDoneOutlined />),
];


const Template = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [headerTitle, setHeaderTitle] = useState('');
    const router = useRouter();
    const {pathname} = router;

    useEffect(() => {
      // Set title when first load and on home (/)
      if(pathname === '/') {
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
    }

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
                        {children}
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
