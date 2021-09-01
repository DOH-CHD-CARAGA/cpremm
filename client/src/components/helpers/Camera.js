import React, { Component } from 'react';
import { connect } from 'react-redux';
import {MdCamera} from 'react-icons/md';
import { Input} from 'reactstrap';

import {SERVER_URI} from './../../config.js';

import { SetPicture } from './../../actions/registrationAction';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.imagePick = React.createRef();
    this.SetDriverImage = this.SetDriverImage.bind(this);
    this.TriggerFilePicker = this.TriggerFilePicker.bind(this);
  }

  TriggerFilePicker (e){
    this.imagePick.current.click();
  }

  SetDriverImage (){
    let reader = new FileReader();
    let file = this.imagePick.current.files[0];
    var val = file.name;
    reader.onloadend = () => {
      console.log(reader.result);
      console.log(file);
      this.props.SetPicture(reader.result, file, this.props.reducer);
    }
    reader.readAsDataURL(file)
  }

  componentWillMount(){
  }

  componentDidMount(){
  }

  render() {
    return (
      <div>
        <div className="customerImage" onClick={this.TriggerFilePicker}
          style={{backgroundImage:`url("${this.props.picture}")`}}
        >
          <div id="cameraButt"><MdCamera /></div>
        </div>
        <input onChange={this.SetDriverImage} ref={this.imagePick} type="file" id="select-file" data-keys="image" hidden={true}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //report: state.report,
})

export default connect(mapStateToProps, {
  SetPicture
})(Camera);
