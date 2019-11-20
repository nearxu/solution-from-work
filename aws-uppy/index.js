import Uppy from '@uppy/core'
import {Dashboard} from '@uppy/react';
import '@uppy/dashboard/dist/style.css'

import AwsS3Multipart from '@uppy/aws-s3-multipart'
import Axios from 'axios';

interface IFileParserProps extends IBaseParserProps {
  component: ITemplateComponentFile;
}

interface IFileParserState {
  fileList: Array<UploadFile>;
  previewImage: string;
  previewVisible: boolean;
}


class FileParser extends BaseParser<IFileParserProps> {
  state: IFileParserState = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  componentDidMount(){}

  render() {
    const {field} = this.props;
    if(!field) return null;
    const url = urls.uploadS3.replace('{moduleBundleID}', field.moduleBundleID).replace('{fileName}', field.name);

    const token = localStorage.getItem(Constants.ACCESS_TOKEN) || '';

    const uppy = Uppy({
      id:'uppy1',
      debug: true,
      autoProceed: true,
    })
    .use(AwsS3Multipart, {
      companionUrl: url,
      serverHeaders: {
        'uppy-auth-token': token
      },
      createMultipartUpload(file:any) {
        console.log(file,'file')
        debugger
        // const { name, type } = file
        return Axios.post(url).then(res => {
          console.log(res,'res')
        })
        // return this.client.post('s3/multipart', { filename, type, path })
      }
    })
    // const [urls, setUrls] = React.useState([])

    uppy.on('file-added', file => Object.assign(file, { path: 'aulas' }))

    uppy.on('complete', ({ successful }) =>{
      console.log(successful,'full')
    }

      // setUrls(
      //   successful.map(({ id, name, uploadURL }) => ({
      //     id,
      //     name,
      //     url: uploadURL.replace(/%2F/g, '/')
      //   }))
      // )
    )

    return this.renderView(
      <div>
        <Dashboard
          uppy={uppy}
          metaFields={[
            { id: 'name', name: 'Name', placeholder: 'File name' }
          ]}
        />
        <button onClick={() => uppy.upload()}></button>
          {/* <Dashboard
            uppy={uppy}
            metaFields={[
              { id: 'name', name: 'Name', placeholder: 'File name' }
            ]}
          />

          <ProgressBar
            uppy={uppy}
            hideAfterFinish={false}
          /> */}
      </div>
    );
  }
}

export default FileParser;