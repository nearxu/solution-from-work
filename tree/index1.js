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

const flatArr = arr => {
   return arr.map(m => {
     if(m.children){
       return flatArr(m.children)
     }
     return m.key
   })
}

const flatArrReduce = (arr, pre) => {
  if (Array.isArray(arr)) {
    return arr.reduce((pre, cur)=>{
      if(cur.children){
        pre.push(cur.key);
        return flatArrReduce(cur.children, pre);
      }else{
        return pre;
      }
    },pre);
  }else{
    return pre;
  }
};

// const bb = flatArrReduce(treeData,[])

// console.log(bb)


const flatArrs = arr => arr.reduce((pre,cur) =>
  pre.concat(Array.isArray(cur) ? flatArrs(cur):cur)
,[])

const aaArr = [1,2,[3,4,[5],[6,7]]]
// const aa = flatArrs(aaArr)

// console.log(aa)

const flatTree = tree => tree.reduce((pre,cur) => {
  let clone = pre.concat()
  clone.push(cur)
  if(cur.children){
    const data = flatTree(cur.children)
    console.log(data,'data')
    clone.concat(data)
  }
  console.log(clone,'clone')
  return clone
},[])

// const ee = flatTree(treeData)

// console.log(ee)


// const a = flatArr(treeData)

// const b = flatReduce(treeData)

// console.log(b)

// console.log(a)

const flatTrees =(list) => {
  var map = {};
  var roots = [];
  var node;
  var i;
  for (i = 0; i < list.length; i += 1) {
      // @ts-ignore
      map[list[i].key] = i;
      list[i].childs = [];
  }
  for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.children !== 0) {
          // @ts-ignore
          list[map[node.children]].push(node);
      }
      else {
          roots.push(node);
      }
  }
  return roots;
}

const ff = flatTrees(treeData)

console.log(ff)