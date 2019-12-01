const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

// want  search value = '1' ,filter all title !== '1'


const filterNodeTree = (treeData,value) => {
  if (!treeData) {
    return null;
  }
  var newTreeData = new Array();
  var node = null;
  var children = null;
  var text = "";
  for (var i = 0; i < treeData.length; i++) {//多个根节点开始遍历
      node = treeData[i];
      if (node.children) {
          children = node.children;
      }
      text = node.title;
      if (text.indexOf(value) > -1) {
          newTreeData.push(node);
          continue;
      } else {
          if (children) {
              var newNodes = filterNodeTree(node.children, value);
              if (newNodes && newNodes.length) {
                  node.children = newNodes;
                  newTreeData.push(node);
              }
          }
      }
      console.log(newTreeData,'newdata')

  }
  return newTreeData;
}

const list = filterNodeTree(treeData,'1')

console.log(list)