export default class DatafileUpload extends Component {
  initialState = {
    fileUploading: false,
    fileList: [],
    status: 'empty', // 'empty' | 'active' | 'success' | 'exception'
    file: {}
  }

  state = this.initialState

  static propTypes = {
    userId: PropTypes.string.isRequired,
    datasetId: PropTypes.string.isRequired
  }

  scrubFilename = (filename) => filename.replace(/[^\w\d_\-.]+/ig, '')

  requestSignedS3Url = (file) => {
    const filename = this.scrubFilename(file.name)
    const params = {
      userId: this.props.userId,
      contentType: file.type,
      Key: `${filename}`
    };
    return api.get('/s3/signUpload', { params })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }

  uploadFile = (file) => {
    this.requestSignedS3Url(file)
      .then(signResult => this.uploadToS3(file, signResult))
      .catch(error => console.log(error))
  }

  createCORSRequest = (method, url, opts) => {
    opts = opts || {};
    let xhr = new XMLHttpRequest();
    if (xhr.withCredentials != null) {
      xhr.open(method, url, true);
      if (opts.withCredentials != null) {
        xhr.withCredentials = opts.withCredentials;
      }
    } else if (typeof XDomainRequest !== "undefined") {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    return xhr;
  };

  stepFunctions = () => {
    return {
      preprocess: (file) => {
        console.log('Pre-process: ' + file.name);
      },
      onProgress: (percent, message, file) => {
        this.setState({ fileUploading: true })
        console.log('Upload progress: ' + percent + '% ' + message);
      },
      onFinish: (signResult) => {
        this.setState({ fileUploading: false })
        console.log("Upload finished: " + signResult.publicUrl)
      },
      onError: (message) => {
        this.setState({ fileUploading: false })
        console.log("Upload error: " + message);
      },
      scrubFilename: (filename) => {
        return filename.replace(/[^\w\d_\-\.]+/ig, '');
      },
      onFinishS3Put: (signResult, file) => {
        console.log(signResult)
        return console.log('base.onFinishS3Put()', signResult.publicUrl);
      }
    }
  }

  uploadToS3 = async (file, signResult) => {
    const xhr = await this.createCORSRequest('PUT', signResult.signedUrl);
    const functions = this.stepFunctions()
    functions.preprocess(file)
    if (!xhr) {
      functions.onError('CORS not supported', file);
    } else {
      xhr.onload = () => {
        if (xhr.status === 200) {
          functions.onProgress(100, 'Upload completed', file);
          return functions.onFinishS3Put('potatopotato', file);
        } else {
          return functions.onError('Upload error: ' + xhr.status, file);
        }
      };
      xhr.onerror = () => {
        return functions.onError('XHR error', file);
      };
      xhr.upload.onprogress = (e) => {
        let percentLoaded;
        if (e.lengthComputable) {
          percentLoaded = Math.round((e.loaded / e.total) * 100);
          return functions.onProgress(percentLoaded, percentLoaded === 100 ? 'Finalizing' : 'Uploading', file);
        }
      };
    }
    xhr.setRequestHeader('Content-Type', file.type);
    if (signResult.headers) {
      const signResultHeaders = signResult.headers
      Object.keys(signResultHeaders).forEach(key => {
        const val = signResultHeaders[key];
        xhr.setRequestHeader(key, val);
      })
    }
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    this.httprequest = xhr;
    return xhr.send(file);
  };

  handleChange = ({ file, fileList }) => {
    const functions = this.stepFunctions()
    functions.preprocess(file)
    if (!file) {
      functions.onError('CORS not supported', file);
    } else {
      file.onload = () => {
        if (file.status === 200) {
          functions.onProgress(100, 'Upload completed', file);
          return functions.onFinishS3Put('potatopotato', file);
        } else {
          return functions.onError('Upload error: ' + file.status, file);
        }
      };
      file.onerror = () => {
        return functions.onError('XHR error', file);
      };
      file.upload.onprogress = (e) => {
        let percentLoaded;
        if (e.lengthComputable) {
          percentLoaded = Math.round((e.loaded / e.total) * 100);
          return functions.onProgress(percentLoaded, percentLoaded === 100 ? 'Finalizing' : 'Uploading', file);
        }
      };
    }
    console.log('File: ', file)
    // always setState
    this.setState({ fileList });
  }

  render() {
    const props = {
      onChange: this.handleChange,
      multiple: true,
      name: "uploadFile",
      defaultFileList: this.initialState.fileList,
      data: this.uploadFile,
      listType: "text",
      customRequest: ????,
      showUploadList: {
        showPreviewIcon: true,
        showRemoveIcon: true
      },
      onProgress: ( {percent} ) => {
        this.setState({ fileUploading: true })
        console.log('Upload progress: ' + percent + '% ' );
      },
      onError: (error, body) => {
        this.setState({ fileUploading: false })
        console.log("Upload error: " + error);
      },
      onSuccess: (body)=> {
        console.log(body)
        return console.log('base.onFinishS3Put()');
      }
    };

    return (
      <Upload {...props} fileList={this.state.fileList}>
        <Button>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
    )
  }
}