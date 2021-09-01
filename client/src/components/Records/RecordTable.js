import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../actions/helpers/displayAction';

import {
  SetRecordDetail
} from '../../actions/recordAction';

import {
  SET_RECORD_DETAIL
} from '../../actions/types';

import {
  SetRecordDefault,
} from '../../actions/recordAction';

import DataTable from '../helpers/DataTable';

const recordTable = (props) =>  {
  console.log("====================================");
  console.log(props.record.records);
    return (

      <Fragment>

        <DataTable
          addData={(props.isMaster)?() => {
            props.SetRecordDefault();
            props.toggleModal("add");
          }:null}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "record/get", search: "record/get" }}
          dataBank = { props.record }
          reducers = {props.reducers}
          search = {{
            options: [ 
              // {value: "propertyCode", text: "Property Code"},
              {value: "propertyCode", text: "Property Code"},
              {value: "serial", text: "Serial"},
              {value: "user", text: "User"},
              {value: "division", text: "Division"},
              {value: "section", text: "Section"},
            ],
            select: [], suggest: false,
          }}
          table = {{
            head: () => {
              return (
                <tr className="clickable">
                  <th scope="col">#</th>
                  <th scope="col">Division</th>
                  <th scope="col">Section</th>
                  <th scope="col">End User PAR</th>
                  <th scope="col">End User CO</th>
                  <th scope="col">Property Code</th>
                  <th scope="col">Serial</th>
                  <th scope="col">Under</th>
                  <th scope="col">Status</th>
                </tr>
              )
            },
            body: (record, i) => {
              return (
                <tr style={{fontSize: "9px"}} className="clickable" data-id={record._id} onClick={ async (e) => {

                  // await props.SetRecordDetail(record._id);
                  await props.SetRecordDetail(i);

                  props.toggle();

                  // props.GetDetail("record/detail", SET_RECORD_DETAIL, record._id)
                  //   .then(data => {
                  //     props.toggle();
                  //   });
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ (record.office != null && typeof(record.office) == "object")?record.office.division:record.division}</td>
                  <td scope="col">{ (record.office != null && typeof(record.office) == "object")?(record.office.section + " (" + record.office.code + ")"):((record.section||"") + " (" + (record.code||"") + ")")}</td>
                  <td scope="col">{ (record.endUser.userPAR)?props.ArrangeName(record.endUser.userPAR.name):record.userPAR }</td>
                  <td scope="col">{ (record.endUser.userCo)?props.ArrangeName(record.endUser.userCo.name):record.userCO }</td>
                  <td scope="col">{ (record.propertyCode != "" && record.propertyCode != " ")?record.propertyCode:"--------" }</td>
                  <td scope="col">{ (record.serial != "" && record.serial != " ")?record.serial:"--------" }</td>
                  <td scope="col">{ record.under }</td>
                  <td scope="col">{ (record.no)?"Active":"Inactive" }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  record: state.record
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetRecordDetail,
  SetRecordDefault,
})(recordTable);
