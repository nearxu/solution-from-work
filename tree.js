const data1 = [
  {
    id:1,
    child:[
      {
        parentId:1,
        id:11
      }
    ]
  },
  {
    id:2,
    child:[
      {
        parentId:2,
        id:22
      }
    ]
  }
]

const trans = (data,id = 0) => {
  data.forEach(item => {
    item.key = id > 0 ? `${item.id}-${id}`:`${item.id}`
    item.child && trans(item.child,item.id)
  })
  return data
}

console.log(trans(data1))

const wantData = [
  {
    id:1,
    key:'1',
    child:[
      {
        parentId:1,
        id:11,
        key:'1-11'
      }
    ]
  },
  {
    id:2,
    key:'2',
    child:[
      {
        parentId:2,
        id:22,
        key:'2-22'
      }
    ]
  }
]
