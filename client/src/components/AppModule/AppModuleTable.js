import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../actions/helpers/displayAction';

import {
  SetAppModuleDetail,
  SetAppModuleDefault,
} from '../../actions/appModuleAction';

import {
  SET_APP_MODULE_DETAIL
} from '../../actions/types';

import DataTable from '../helpers/DataTable';

const AppModuleTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetAppModuleDefault();
            props.toggleModal("add");
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: "admin/appModule/get", search: "admin/appModule/get" }}
          dataBank = { props.appModule }
          reducers = {props.reducers}
          search = {{
            options: [ {value: "name", text: "Name"}, {value: "appModuleID", text: "App Module ID"} ],
            select: [], suggest: false,
          }}
          table = {{
            head: () => {
              return (
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">App Module ID</th>
                  <th scope="col">Module</th>
                  <th scope="col">Type</th>
                  <th scope="col">Added</th>
                  <th scope="col">Generated</th>
                </tr>
              )
            },
            body: (appModule, i) => {
              console.log(appModule)
              return (
                <tr className="clickable" data-id={appModule._id} onClick={ async (e) => {

                  await props.SetAppModuleDetail(appModule._id);

                  props.toggle();

                  // props.GetDetail("appModule/detail", SET_APP_MODULE_DETAIL, appModule._id)
                  //   .then(data => {
                  //     // props.toggle();
                  //   });
                }}>
                  <td scope="col">{ i + 1 }</td>
                  <td scope="col">{ appModule.appModuleID }</td>
                  <td scope="col">{ appModule.name }</td>
                  <td scope="col">{ appModule.moduleType.toUpperCase() }</td>
                  <td scope="col">{ props.ArrangeDate(appModule.addedAt) }</td>
                  <td scope="col">{ (appModule.isGenerated)?"YES":"NO" }</td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
}


const mapStateToProps = (state) => ({
  appModule: state.appModule
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetAppModuleDetail,
  SetAppModuleDefault,
})(AppModuleTable);
