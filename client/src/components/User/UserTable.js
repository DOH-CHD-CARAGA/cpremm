import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../actions/helpers/displayAction';

import {
  SetUserDetail,
  SetUserDefault,
} from '../../actions/userAction';

import {
  SET_USER_DETAIL
} from '../../actions/types';

import DataTable from '../helpers/DataTable';

const UserTable = (props) =>  {
  console.log(props);
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetUserDefault();
            props.toggleModal("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "user/get", search: "user/get" }}
          dataBank = { props.user }
          reducers = {props.reducers}
          search = {{
            options: [ {value: "name", text: "User"}, {value: "office.division", text: "Division"}, {value: "office.section", text: "Section"} ],
            select: [], suggest: false,
          }}
          table = {{
            head: () => {
              return (
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Branch</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Status</th>
                  <th scope="col">Role</th>
                </tr>
              )
            },
            body: (user, i) => {
              console.log(user);

              return (
                <tr className="clickable" data-id={user._id} onClick={ async (e) => {
                  await props.SetUserDetail(user._id);

                  props.toggle();

                  // props.GetDetail("user/detail", SET_USER_DETAIL, user._id)
                  //   .then(data => {
                  //     console.log(data);
                  //     // props.toggle();
                  //   });
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ user.userID }</td>
                  <td scope="col">{ props.ArrangeName(user.name) }</td>
                  <td scope="col">{ user.office.division + " " +  user.office.section}</td>
                  <td scope="col">{ user.designation }</td>
                  <td scope="col">{ user.status }</td>
                  <td scope="col">{ user.role.name }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetUserDetail,
  SetUserDefault,
})(UserTable);
