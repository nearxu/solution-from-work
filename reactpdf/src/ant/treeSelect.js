import React from "react";
import { TreeSelect, Button, Checkbox } from "antd";

const { TreeNode } = TreeSelect;

export default class TreeSelectComponent extends React.Component {
  state = {
    data: [
      {
        title: "1",
        key: "0-0",
        children: [
          {
            title: "11",
            key: "0-0-0"
          },
          {
            title: "12",
            key: "0-0-1"
          },
          {
            title: "13",
            key: "0-0-2"
          }
        ]
      },
      {
        title: "2",
        key: "1-1",
        children: [
          {
            title: "22",
            key: "1-1-1"
          },
          {
            title: "23",
            key: "1-1-2"
          },
          {
            title: "24",
            key: "1-1-3"
          }
        ]
      }
    ],
    checkedKeys: []
  };
  onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  onCheck = (checkedKeys, info) => {
    this.setState({ checkedKeys });
  };
  onSelectAll = () => {
    console.log(this.state.checkedKeys, "chek");
    this.setState({ checkedKeys: ["0-0"] });
  };
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode>
          {this.renderItem(item)}
        </TreeNode>
      );
    });

  renderItem = item => {
    const { checkedKeys } = this.state;
    return (
      <div>
        <Checkbox checked={checkedKeys.indexOf(item.key) > -1} />
        <div>{item.title}</div>
      </div>
    );
  };
  render() {
    return (
      <div>
        <TreeSelect
          checkable
          onSelect={this.onSelect}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
        >
          {this.renderTreeNodes(this.state.data)}
        </TreeSelect>
        <Button onClick={this.onSelectAll}>select all</Button>
      </div>
    );
  }
}
