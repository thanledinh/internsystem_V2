import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  DashboardOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  TeamOutlined,
  SettingOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  theme,
  Tag,
} from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/logo.svg";
import logo2 from "../assets/logo2.svg";
import WelcomeMessage from "./WelcomeLayout";
import {
  setActiveKey,
  toggleSidebar,
  setOpenKeys,
} from "@redux/features/sidebarMenuSlice";
import { logout } from "@redux/features/authReducer/authSlice";

import endPoints from "../routers/router";
import { imageBaseUrl } from "@utils/imageUtils";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const dispatch = useDispatch();
  const { collapsed, activeKey, openKeys } = useSelector(
    (state) => state.sidebar
  );
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { user, role } = useSelector((state) => state.auth);

  useEffect(() => {
    const currentPath = location.pathname;
    let activeKey = currentPath;

    // Check if the current path is a job detail page
    if (currentPath.startsWith(endPoints.QUANLYCONGVIEC) && currentPath !== endPoints.QUANLYCONGVIEC) {
      activeKey = endPoints.QUANLYCONGVIEC;
    }

    dispatch(setActiveKey(activeKey));

    // Find the parent key if it's a child route
    const parentKey = menuItems.find(
      (item) =>
        item.children &&
        item.children.some((child) => child.key === activeKey)
    )?.key;

    if (parentKey) {
      dispatch(setOpenKeys([parentKey]));
    }
  }, [location.pathname, dispatch]);

  const handleMenuClick = ({ key }) => {
    dispatch(setActiveKey(key));
    navigate(key);
  };

  const onOpenChange = (keys) => {
    dispatch(setOpenKeys(keys));
  };

  const menuItems = [
    {
      key: endPoints.DASHBOARD,
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: endPoints.QUANLYDUAN,
      icon: <ScheduleOutlined />,
      label: "Quản lý dự án",
    },
    {
      key: endPoints.QUANLYINTERN,
      icon: <TeamOutlined />,
      label: "Quản lý Intern",
      children: [
        {
          key: `${endPoints.QUANLYINTERN}/${endPoints.DANHSACHINTERN}`,
          icon: <UsergroupAddOutlined />,
          label: "Danh sách Intern",
        },
        {
          key: `${endPoints.QUANLYINTERN}/${endPoints.KYTHUCTAP}`,
          icon: <CalendarOutlined />,
          label: "Kì thực tập",
        },
      ],
    },
    {
      key: endPoints.QUANLYVITRI,
      icon: <SettingOutlined />,
      label: "Quản lý vị trí",
    },
    {
      key: endPoints.QUANLYCONGVIEC,
      icon: <SolutionOutlined />,
      label: "Quản lý công việc",
    },
    {
      key: endPoints.QUANLYNGUOIDUNG,
      icon: <UsergroupAddOutlined />,
      label: "Quản lý người dùng",
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          borderRadius: 20,
          marginRight: 10,
        }}
        theme="light"
        width={270}
      >
        <div style={{ textAlign: "center", padding: "16px" }}>
          <img
            src={collapsed ? logo2 : logo}
            alt="logo"
            className="primary-logo"
            style={{ maxWidth: collapsed ? "32px" : "120px", height: "auto" }}
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeKey]}
          openKeys={openKeys}
          onClick={handleMenuClick}
          onOpenChange={onOpenChange}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            borderRadius: 20,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => dispatch(toggleSidebar())}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />

          <Dropdown
            menu={{
              items: [
                {
                  label: (
                    <Button onClick={handleLogout} style={{ width: "100%" }}>
                      Logout
                    </Button>
                  ),
                  key: "0",
                  style: { textAlign: "center" },
                },
              ],
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()} style={{ color: "black" }}>
              <Space>
                <Avatar
                  size="large"
                  src={
                    `${imageBaseUrl}${user?.imagePath}` ||
                    "https://i.pravatar.cc/300"
                  }
                />
                Hi {user?.username}
                <Tag color="blue">{role}</Tag>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: 20,
          }}
        >
          {/* <Outlet />
          {location.pathname === "/" && <WelcomeMessage />} */}
          {location.pathname === "/" ? <WelcomeMessage /> : <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
