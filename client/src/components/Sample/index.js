import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import {SampleActionAlert} from '../../actions/sampleAction';
import  AddSample from './AddSample';

class Sample extends Component {
  
  render() {
    console.log(this.props);
    return (
      <div id="sample" className="justify-content-center">
        <AddSample/>
        <Button 
        onClick={()=>{
          // alert("hello");
          console.log(this.props.sampleRed.sample1);
          this.props.SampleActionAlert("None")
        }}
        children="Hello"
        />
        {this.props.sampleRed.sample2}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sampleRed:state.sample
});

export default connect(mapStateToProps, {
  SampleActionAlert
})(Sample);