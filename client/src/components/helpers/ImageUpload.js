import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdFileUpload, MdRemoveCircle} from 'react-icons/md';
import { Input, Badge} from 'reactstrap';

import {SERVER_URI} from './../../config.js';

import {
  SendToReducer,
  TypeOf,
} from './../../actions/helpers/displayAction';


class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images || [],
      imageCount: (props.images)?props.images.length:0,
    };
    this.imagePick = React.createRef();
    this.SetDriverImage = this.SetDriverImage.bind(this);
    this.TriggerFilePicker = this.TriggerFilePicker.bind(this);
    this.RemoveImage = this.RemoveImage.bind(this);
    this.LoadFile = this.LoadFile.bind(this);
  }

  TriggerFilePicker (e){
    this.imagePick.current.click();
  }

  LoadFile (file, ind) {
    let reader = new FileReader();
    reader.onloadend = () => {
      var images = [...this.state.images];
      images[ind].base64 = reader.result;
      this.setState({
        images: [...images]
      })
    }
    reader.readAsDataURL(file)
  }

  SetDriverImage (e){
    return new Promise((resolve, reject) => {
      var files = e.target.files;

      files = [...files]

      var images = [];

      files.map(async (file, i) => {
        images.push({
          file: file,
          base64: ""
        });
      })

      this.setState({
        imageCount: this.state.imageCount + images.length,
        images: [...this.state.images, ...images]
      });

      console.log(images);
      console.log(files);
      for (var x = 0, len = images.length; x < len; x++){
        this.LoadFile(images[x].file, x + this.state.imageCount);
      }
      console.log(this.state.images);
    });
  }
          //
          //
          // console.log(file);
          // console.log(this.state.images);
          // console.log(this.state.imageCount);
          // let reader = new FileReader();
          // reader.addEventListener("load", (event) => {
          //   console.log("================================================");
          //   console.log(x);
          //   console.log(reader.result);
          //   this.setState({
          //     images: [...this.state.images, {
          //       file: file,
          //       base64: reader.result,
          //     }]
          //   });
          // });
          // reader.onloadend = () => {
          //   resolve();
          // }
          // reader.readAsDataURL(file);
          // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");

  RemoveImage (i) {
    var images = [...this.state.images];
    images = images.filter((image, j) => {
      return (i != j);
    })
    this.setState({
      images: [...images],
      imageCount: this.state.imageCount - 1
    })
  }

  componentWillMount(){
  }

  componentDidMount(){
  }

  render() {
    console.log(this.state.images);
    console.log(this.state.images.length);
    console.log(this.state.imageCount);
    if (this.state.imageCount == this.state.images.length){
      console.log("------------------------------------------");
      console.log(this.state.images);
      console.log(this.state.imageCount);
      console.log("------------------------------------------");
      this.props.SendToReducer(this.props.reducer, this.state.images);
    }
    var imgIsObj;
    return (
      <div>
        <input
          onChange={async (e) => {
            this.SetDriverImage(e);
          }}
          type="file" className="file-upload"
          multiple ref={this.imagePick} hidden={true}
        />
        <div id="images" className="d-flex flex-row flex-wrap">
            {
              this.state.images.map((image, i) => {
                imgIsObj = (this.props.TypeOf(image) == "object");
                return (
                  <div className="image-div" style={{width: "25%"}}>
                    <div className="image d-flex flex-row justify-content-end"
                      style={{backgroundImage:`url("${(imgIsObj)?image.base64:SERVER_URI + "/tricycle/" + image}")`}}
                    >

                      <MdRemoveCircle onClick={() => {
                        this.RemoveImage(i)
                      }}/>
                      {
                        (imgIsObj)
                          ?<Badge color="primary">NEW</Badge>
                          :""
                      }

                    </div>
                  </div>
                )
              })
            }
            <div className="image-div" style={{width: "25%"}}>
              <div className="image d-flex flex-row justify-content-between" style={{backgroundColor:"#212529"}}>
                <MdFileUpload onClick={this.TriggerFilePicker}/>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //report: state.report,
})

export default connect(mapStateToProps, {
  SendToReducer,
  TypeOf,
})(Camera);
