import { useState } from "react";
import { Menu, Divider } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ToolOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import appLogo from "./../../../assets/svg/app-icon.svg";

const iconMap = {
  Worklist: <AppstoreOutlined />,
  "Patient Management": <UserOutlined />,
  Maintenance: <ToolOutlined />,
  "Tenant Config": <SettingOutlined />,
  "Form Config": <DatabaseOutlined />,
  Help: <QuestionCircleOutlined />,
};

const SideMenuItem = ({ label }) => {
  return (
    <div className="flex h-[40px] px-3 py-2">
      <i className="h-5 w-5">H</i>
      <div className="ml-3 font-medium" style={{ color: "#FFFFFF80" }}>
        {label}
      </div>
    </div>
  );
};

const SideMenu = ({ menuData, onMenuClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  const renderMenuItems = (items) =>
    items.map((item) => ({
      key: item.key,
      icon: iconMap[item.label] || null,
      label: item.label,
    }));

  return (
    <nav
      className={`h-screen bg-[#1C1B1B] text-white flex flex-col p-6 rounded-tr-xl rounded-br-xl ${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300`}
    >
      <header className="flex items-center justify-center border-gray-800">
        <img src={appLogo} alt="AS SOFTWARE" />
      </header>

      <Divider className="bg-gray-800 h-[2px]" />

      {/* Menu */}
      <section className="flex-1 overflow-auto">
        {menuData.map((section, index) => (
          <div key={index} className="mb-4">
            {!collapsed && (
              <div
                className="text-xs text-white font-medium uppercase tracking-wide mb-2"
                style={{ lineHeight: "12px", letterSpacing: "0.4px" }}
              >
                {section.section}
              </div>
            )}
            <Menu
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              items={renderMenuItems(section.items)}
              onClick={({ key }) => onMenuClick?.(key)}
              className="!bg-gray-900"
            />
          </div>
        ))}
      </section>

      <section className="bottom-section">
        <div className="mb-4">
          <SideMenuItem label="Help" />
        </div>

        <div className="flex items-center">
          <img
            className="h-[44px] w-[44px] border-2 border-white rounded-full"
            src="https://i.pravatar.cc/40"
          />
          {!collapsed && (
            <div className="ml-3 w-full">
              <div
                className="text-[10px] text-gray-400 uppercase font-medium"
                style={{ lineHeight: "12px" }}
              >
                Sonographer
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm font-medium">Catherine Wang</div>
                <i className="text-[#ffffff80] w-4 h-4 flex items-center justify-center">
                  v
                </i>
              </div>
            </div>
          )}
        </div>

        <div
          onClick={() => setCollapsed((prev) => !prev)}
          className="flex items-center justify-between mt-6 pt-3 border-t-2 border-gray-800 text-[#ffffff80] hover:text-white w-full h-[52px]"
        >
          {!collapsed && <span className="ml-2">Collapse</span>}
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </section>
    </nav>
  );
};

export default SideMenu;
