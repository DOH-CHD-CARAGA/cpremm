import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import {SampleActionAlert} from '../../actions/sampleAction';
const Alert = (props) =>  {
  return (
    <div>
      <Button 
        onClick={()=>{
          // alert("hello");
          props.SampleActionAlert()
        }}
        children="Hello"
        />
    </div>
  );
}
const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {
  SampleActionAlert
})(Alert);
