import { PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined, FileDoneOutlined } from '@ant-design/icons';
import { PageHeader, Layout, Menu } from 'antd';
import { useState } from 'react';
import styles from '../styles/Template.module.less'
const { Header, Content, Footer, Sider } = Layout;
import { useRouter } from 'next/router';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Project', '1', <PieChartOutlined />, [
    getItem('Add New', 'project/new'),
    getItem('Projects', '3'),
  ]),
  getItem('Option 2', '4', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '5'),
    getItem('Bill', '6'),
    getItem('Alex', '7'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '8'), getItem('Team 2', '9')]),
  getItem('Files', '10', <FileDoneOutlined />),
];

const Template = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const onClick = (e) => {
    console.log('click ', e);
    router.push(e.key);
  };
  
  return (
    <Layout
      style={{
        minHeight: "100vh"
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
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-header"
          style={{
            padding: 0,
            background: "#dedede"
          }}
        >
          <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Title"
            subTitle="This is a subtitle"
          />
        </Header>
        <Content
          style={{
            margin: "0 16px"
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360
            }}
          >
            { children }
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center"
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Template;