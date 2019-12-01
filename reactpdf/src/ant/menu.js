import React from 'react';
import { Menu, Dropdown, Icon } from "antd";
const { SubMenu } = Menu;
const menu = (
  <Menu>
    <Menu.Item>1st menu item</Menu.Item>
    <Menu.Item>2nd menu item</Menu.Item>
    <SubMenu title="sub menu">
      <Menu.Item>3rd menu item</Menu.Item>
      <Menu.Item>4th menu item</Menu.Item>
      <SubMenu title="sub menu">
        <Menu.Item>3rd menu item</Menu.Item>
        <Menu.Item>4th menu item</Menu.Item>
      </SubMenu>
    </SubMenu>
    <SubMenu title="disabled sub menu" disabled>
      <Menu.Item>5d menu item</Menu.Item>
      <Menu.Item>6th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);

export default class MenuItemComponent extends React.Component {
  state = {
    visible: false
  };
  handleChange = visible => {
    this.setState({ visible });
  };
  render() {
    return (
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        visible={this.state.visible}
        onVisibleChange={this.handleChange}
      >
        <a className="ant-dropdown-link" href="#">
          Click me <Icon type="down" />
        </a>
      </Dropdown>
    );
  }
}