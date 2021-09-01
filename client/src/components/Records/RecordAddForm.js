import React from 'react';
import { connect } from 'react-redux';
import { 
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

import { FaPlus, FaTimes } from 'react-icons/fa';
import LabelInput from '../helpers/LabelInput';
import {
  GetDate,
} from '../../actions/helpers/dateAction';

import {
  SET_RECORD_VALUE,
} from '../../actions/types';

class RecordAddForm extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      route: "",
    }
  }


  render () {

    return (
      <div id="record-add-form" className="entry-form">
        {/* <Card>
          <CardHeader tag="h3">Featured</CardHeader>
          <CardBody>

          </CardBody>
        </Card> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  record: state.record
});

export default connect(mapStateToProps, {
  GetDate,
})(RecordAddForm);
