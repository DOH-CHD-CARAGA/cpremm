import React, { Component } from 'react';
import { connect } from 'react-redux';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  componentWillMount (){
  }

  render() {

    return (
      <div>

      </div>
    );

  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(Test);
