import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sample extends Component {
  
  render() {
    return (
      <div id="sample" className="justify-content-center">
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Sample);