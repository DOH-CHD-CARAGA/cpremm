import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../actions/helpers/displayAction';

import {
  SetRoleDetail
} from '../../actions/roleAction';

import {
  SET_ROLE_DETAIL
} from '../../actions/types';

import {
  SetRoleDefault,
} from '../../actions/roleAction';

import DataTable from '../helpers/DataTable';

const roleTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetRoleDefault();
            props.toggleModal("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "role/get", search: "role/search" }}
          dataBank = { props.role }
          reducers = {props.reducers}
          search = {{
            options: [ {value: "name", text: "Role"} ],
            select: [], suggest: false,
          }}
          table = {{
            head: () => {
              return (
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Role</th>
                </tr>
              )
            },
            body: (role, i) => {

              return (
                <tr className="clickable" data-id={role._id} onClick={ async (e) => {

                  await props.SetRoleDetail(role._id);

                  props.toggle();

                  // props.GetDetail("role/detail", SET_ROLE_DETAIL, role._id)
                  //   .then(data => {
                  //     // props.toggle();
                  //   });
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ role.name }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  role: state.role
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetRoleDetail,
  SetRoleDefault,
})(roleTable);
