var fs = require('fs')
var path = require('path')

var image = require('imageinfo') // cnpm i

var myPath = path.dirname(__dirname + '/img/img')

console.log(myPath)

// fs.readdir(myPath, function(err, files) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(files)
// })

function readFileList(path, filesList) {
  var files = fs.readdirSync(path)
  files.forEach(function(itm, index) {
    var stat = fs.statSync(path + '/' + itm)
    if (stat.isDirectory()) {
      //递归读取文件
      readFileList(path + itm + '/', filesList)
    } else {
      var obj = {} //定义一个对象存放文件的路径和名字
      obj.path = path //路径
      obj.filename = itm //名字
      filesList.push(obj)
    }
  })
}
var getFiles = {
  //获取文件夹下的所有文件
  getFileList: function(path) {
    var filesList = []
    readFileList(path, filesList)
    return filesList
  },
  //获取文件夹下的所有图片
  getImageFiles: function(path) {
    var imageList = []

    this.getFileList(path).forEach(item => {
      var ms = image(fs.readFileSync(item.path + '/' + item.filename))
      ms.filename = item.filename // add filename
      ms.mimeType && imageList.push(ms)
    })
    return imageList
  }, //获取文件夹下所有非图片的文件 2018年8月18日 19:15:13更新
  getTxtList: function(path) {
    return this.getFileList(path).filter(item => {
      var ms = image(fs.readFileSync(item.path + item.filename))

      return !ms.mimeType
    })
  }
}
//获取文件夹下的所有图片
getFiles.getImageFiles(myPath)
//获取文件夹下的所有文件
getFiles.getFileList(myPath)
