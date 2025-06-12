import { useMemo, useState } from "react";
import { Menu, Divider, theme } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ToolOutlined,
  DatabaseOutlined,
  DownOutlined
} from "@ant-design/icons";
import { menuConfig } from "./menuConfig.ts";
import appLogo from "../../assets/svg/app-icon.svg";
import "./sidemenu.scss";

// TODO: Icon separate component which takes the name and provide the SVG with size and color customizable. (low priority)

const iconMap = {
  "Worklist": <AppstoreOutlined style={{ fontSize: 16 }} />,
  "Patient Management": <UserOutlined style={{ fontSize: 16 }} />,
  "Maintenance": <ToolOutlined style={{ fontSize: 16 }} />,
  "Tenant Config": <SettingOutlined style={{ fontSize: 16 }} />,
  "Form Config": <DatabaseOutlined style={{ fontSize: 16 }} />,
  "Help": <QuestionCircleOutlined style={{ fontSize: 16 }} />,
};

const SideMenuItem = ({ label, icon = null, labelStyle = {} }) => {
  return (
    <div className="flex h-[40px] px-3 py-2 flex items-center cursor-pointer" style={labelStyle}>
      <i className="h-5 w-5 flex items-center justify-center">{icon}</i>
      <div className="ml-3 font-medium text-sm">
        {label}
      </div>
    </div>
  );
};

const SideMenu = ({ menuData = [], onMenuClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  const { token } = theme.useToken();

  const normalizedMenuItems = useMemo(() => {
    const menuItems = menuData.length ? menuData : menuConfig;

    const normalizeMI = (items) => {
      return items.map((item) => {
        const menuObj = {
          ...item
        };
        if(item.type !== "group") menuObj.label = <SideMenuItem label={item.label} icon={iconMap[item.label] || null} />;
        if(item?.children) menuObj.children = normalizeMI(item.children);
        return menuObj;
      });
    }

    return normalizeMI(menuItems);
  }, [menuData]);

  return (
    <aside
      className={`side-menu h-screen text-white flex flex-col p-6 rounded-tr-xl rounded-br-xl ${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300`}
      style={{ backgroundColor: token.colorSecondary }}
    >
      <header className="flex items-center justify-center border-gray-800">
        <img src={appLogo} alt="AS SOFTWARE" />
      </header>

      <Divider className="h-[2px]" style={{ backgroundColor: token.borderLight }} />

      <section className="flex-1 overflow-auto">
        <Menu
          defaultSelectedKeys={['worklist']}
          mode="inline"
          inlineCollapsed={collapsed}
          items={normalizedMenuItems}
          onClick={({ key }) => onMenuClick?.(key)}
        />
      </section>

      <section className="bottom-section">
        <div className="mb-4">
          <SideMenuItem label="Help" icon={iconMap["Help"]} labelStyle={{ color: token.textLight }} />
        </div>

        <div className="flex items-center">
          <img
            className="h-[44px] w-[44px] border-2 border-white rounded-full"
            src="https://i.pravatar.cc/40"
            style={{ borderColor: token.textWhite }}
          />
          {!collapsed && (
            <div className="ml-3 w-full">
              <div
                className="text-[10px] uppercase font-medium mb-1"
                style={{ color: token.textLight }}
              >
                Sonographer
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm font-medium">Catherine Wang</div>
                <i className="w-4 h-4 flex items-center justify-center" style={{ color: token.textLight }}>
                  <DownOutlined style={{  fontSize: 12}} />
                </i>
              </div>
            </div>
          )}
        </div>

        <div
          className="cursor-pointer flex items-center justify-between mt-6 pt-3 border-t-2 hover:text-white w-full h-[52px]"
          style={{ color: token.textLight, borderColor: token.borderLight }}
        >
          {!collapsed && <span className="ml-2">Collapse</span>}
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </section>
    </aside>
  );
};

export default SideMenu;
