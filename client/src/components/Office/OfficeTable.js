import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../actions/helpers/displayAction';

import {
  SetOfficeDetail
} from '../../actions/officeAction';

import {
  SET_OFFICE_DETAIL
} from '../../actions/types';

import {
  SetOfficeDefault,
} from '../../actions/officeAction';

import DataTable from '../helpers/DataTable';

const officeTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetOfficeDefault();
            props.toggleModal("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "office/get", search: "office/get" }}
          dataBank = { props.office }
          reducers = {props.reducers}
          search = {{
            options: [ {value: "division", text: "Division"}, {value: "section", text: "Section"} ],
            select: [], suggest: false,
          }}
          table = {{
            head: () => {
              return (
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Office ID</th>
                  <th scope="col">Division</th>
                  <th scope="col">Section</th>
                  <th scope="col">Code</th>
                </tr>
              )
            },
            body: (office, i) => {

              return (
                <tr className="clickable" data-id={office._id} onClick={ async (e) => {

                  await props.SetOfficeDetail(office._id);

                  props.toggle();

                  // props.GetDetail("office/detail", SET_OFFICE_DETAIL, office._id)
                  //   .then(data => {
                  //     // props.toggle();
                  //   });
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ office.officeID }</td>
                  <td scope="col">{ office.division }</td>
                  <td scope="col">{ office.section }</td>
                  <td scope="col">{ office.code }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  office: state.office
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetOfficeDetail,
  SetOfficeDefault,
})(officeTable);
