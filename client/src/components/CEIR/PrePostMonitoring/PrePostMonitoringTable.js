import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../../actions/helpers/displayAction';

import {
  SetPrePostMonitoringDetail,
  SetPrePostMonitoringDefault,
} from '../../../actions/prePostMonitoringAction';

import DataTable from '../../helpers/DataTable';

const PrePostMonitoringTable = (props) =>  {
  console.log("____________________________________+++++++++==");
  console.log(props.prePostMonitoring);
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetPrePostMonitoringDefault();
            props.toggleModal('add');
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: 'admin/prePostMonitoring/get', search: 'admin/prePostMonitoring/get' }}
          dataBank = { props.prePostMonitoring }
          reducers = {props.reducers}
          search = {{
            options: [ 
              {value: 'prePostMonitoringID', text: 'PrePostMonitoring ID'}, 
              {value: 'name', text: 'name'}, 
            ],
            select: [], suggest: false,
          }}
          table = {{

            head: [
              { name: '#'},
              { name: 'PrePostMonitoring ID' , prop: 'prePostMonitoringID', selected: true},
              { name: 'name' , prop: 'name'},
            ],

            body: (prePostMonitoring, i) => {

              return (
                <tr style={{fontSize: '11px'}} className='clickable' data-id={prePostMonitoring._id} onClick={ async (e) => {

                  await props.SetPrePostMonitoringDetail(prePostMonitoring._id);

                  props.toggle();
                   // props.GetDetail('prePostMonitoring/detail', SET_DEVICE_DETAIL, prePostMonitoring._id)
                   //   .then(data => {
                   //     // props.toggle();
                   //   });

                }}>
                  <td scope='col'>{ i + 1 }</td>
                  <td scope='col'>{ prePostMonitoring.prePostMonitoringID }</td>
                  <td scope='col'>{ prePostMonitoring.name }</td>
                </tr>
              )
            }
          }}
        />
      </Fragment>
    );
}

const mapStateToProps = (state) => ({
  prePostMonitoring: state.prePostMonitoring
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetPrePostMonitoringDetail,
  SetPrePostMonitoringDefault,
})(PrePostMonitoringTable);

