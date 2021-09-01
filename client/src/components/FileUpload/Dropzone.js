import React, { Component, useCallback } from 'react';
import { connect } from 'react-redux';

// import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';

class RDropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };


  }

  render() {

    // const onDrop = useCallback(acceptedFiles => {
    //     const reader = new FileReader()
     
    //     reader.onabort = () => console.log('file reading was aborted')
    //     reader.onerror = () => console.log('file reading has failed')
    //     reader.onload = () => {
    //       // Do whatever you want with the file contents
    //       const binaryStr = reader.result
    //       console.log(binaryStr)
    //     }
     
    //     acceptedFiles.forEach(file => reader.readAsArrayBuffer(file))
    // }, []);

    // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop: onDrop});

    return (
      <div id="dropzone">
        {/* <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div> */}
        <Dropzone> Drop File Here </Dropzone>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {

})(RDropzone);
