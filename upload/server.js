var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 80;

function formidable(req, res) {
    // parse a file upload
    var expect = 'sp';
    var sp, cont, type;
    req.on('data', function(tr) {
        //console.log('trunk:', tr.length, tr.toString());
        while(1) {
            switch(expect) {
                case 'sp':
                    var idx = tr.indexOf('\r\n');
                    sp = tr.slice(0, idx).toString();
                    tr = tr.slice(idx+2);
                    console.log('sp:', sp);
                    expect = 'content';
                    break;
                case 'content':
                    var idx = tr.indexOf('\r\n');
                    cont = tr.slice(0, idx).toString();
                    tr = tr.slice(idx+2);
                    console.log('content:', cont);
                    expect = 'type';
                    break;
                case 'type':
                    var idx = tr.indexOf('\r\n');
                    type = tr.slice(0, idx).toString();
                    tr = tr.slice(idx+2);
                    console.log('type:', type);
                    expect = 'end';
                    break;
                case 'end':
                    var idx = tr.indexOf(sp);
                    console.log('data length:', tr.length);
                    if(idx >= 0) {
                        console.log('end');
                    }
                    return;
            }
        }
    }).on('end',function() {
        res.end(`<head>
            <meta http-equiv="Content-Type" content="text/html; charset=gbk" />
            </head>
            <body>${cont}</body>`);
    });
}

var mimeTypes = {
    "htm": "text/html",
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "gif": "image/gif",
    "js": "text/javascript",
    "css": "text/css"};

var virtualDirectories = {
    //"images": "../images/"
  };

process.chdir(__dirname);
http.createServer(function(request, response) {
  //console.log('0000000000', request.url);
  if (request.url == '/upload' && request.method.toLowerCase() == 'post') {
     console.log('upload', request.url);
     formidable(request, response);
     return;
  }

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri)
    , root = uri.split("/")[1]
    , virtualDirectory;

  virtualDirectory = virtualDirectories[root];
  if(virtualDirectory){
    uri = uri.slice(root.length + 1, uri.length);
    filename = path.join(virtualDirectory ,uri);
  }

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      console.error('404: ' + filename);
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        console.error('500: ' + filename);
        return;
      }

      var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
      response.writeHead(200, {"Content-Type": mimeType});
      response.write(file, "binary");
      response.end();
      console.log('200: ' + filename + ' as ' + mimeType);
    });
  });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");