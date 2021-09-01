import React from 'react';
import { connect } from 'react-redux';
import { 
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

import { FaPlus, FaTimes } from 'react-icons/fa';
import LabelInput from '../../helpers/LabelInput';
import {
  GetDate,
} from '../../../actions/helpers/dateAction';

import {
  SetValue,
  GetList,
  ArrangeName,
} from '../../../actions/helpers/displayAction';
import {
  UpdateRecordActions,
} from '../../../actions/recordAction';

import {
  SET_RECORD_VALUE,
} from '../../../actions/types';

class Table6 extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
    }
  }


  render () {
    var { record } = this.props.record;
    console.log(record);
    return (
      <div id="record-add-form-7" className="entry-form">
        <Card>
          <CardHeader tag="h3">Other ICT Equipment(s) Issued</CardHeader>
          <CardBody>
            <div className="form-content">
              <div className="row">
                
                <div className="col-md-12">
                  <Card>
                    <CardHeader className="table-header" tag="h6">
                      <FaPlus className="add-button"
                        onClick={() => {
                          this.props.UpdateRecordActions();
                        }}
                      />
                    </CardHeader>
                    <CardBody>

                      <table className="table table-hover table-striped">
                        <thead>
                          <tr>
                            <th>Item Description</th>
                            <th>Specification</th>
                            <th>Serial #</th>
                            <th>Property #</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>     
                          {
                             record.otherEquipments.map((data, i) => {
                              return(
                                <tr>
                                  <td>
                                    { record.otherEquipments[i].type } 
                                  </td>     
                                  <td>
                                    { record.otherEquipments[i].brand }    
                                  </td>  
                                  <td>
                                    { record.otherEquipments[i].serial }  
                                  </td>  
                                  <td>
                                    { record.otherEquipments[i].propertyNo } 
                                  </td>  
                                  <td>
                                    { (record.otherEquipments[i].status)?"WORKING":"WASTED" }  
                                  </td>          
                                  <td>
                                    <FaTimes className="del-button"
                                      onClick={() => {
                                        this.props.UpdateRecordActions("-", i);
                                      }}
                                    />
                                  </td>
                                </tr>

                              )
                             })
                          }
                        
                        
                        </tbody>
                      </table>
                    
                    </CardBody>
                  </Card>  
                </div>

              </div>
            </div>

          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  record: state.record
});

export default connect(mapStateToProps, {
  GetDate,
  SetValue,
  GetList,
  ArrangeName,
  UpdateRecordActions,
})(Table6);
