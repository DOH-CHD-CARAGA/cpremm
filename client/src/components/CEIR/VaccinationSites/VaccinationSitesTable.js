import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../../actions/helpers/displayAction';

import {
  SetVaccinationSitesDetail,
  SetVaccinationSitesDefault,
} from '../../../actions/vaccinationSitesAction';

import DataTable from '../../helpers/DataTable';

const VaccinationSitesTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetVaccinationSitesDefault();
            props.toggleModal('add');
          }}
          upload={{
            callback: () => {
               props.toggleUpload();
            }
          }}          
          title = {props.title}
          filter = {props.filter}
          api = {{ get: 'ceir/vaccination-sites/get', search: 'ceir/vaccination-sites/get' }}
          dataBank = { props.vaccinationSites }
          reducers = {props.reducers}
          search = {{
            options: [ 
              {value: 'code', text: 'Code'}, 
              {value: 'codeShort', text: 'Code Short'}, 
              {value: 'name', text: 'Name'}, 
              {value: 'type', text: 'Type'}, 
              {value: 'ownership', text: 'Ownership'}, 
              {value: 'address', text: 'Address'}, 
              {value: 'supervisor', text: 'Supervisor'}, 
              {value: 'status', text: 'Status'}, 
            ],
            select: [], suggest: false,
          }}
          table = {{

            head: [
              { name: '#'},
              { name: 'Code' , prop: 'code', selected: true},
              { name: 'Code Short' , prop: 'codeShort'},
              { name: 'Name' , prop: 'name'},
              { name: 'Type' , prop: 'type'},
              { name: 'Ownership' , prop: 'ownership'},
              { name: 'Address' , prop: 'address'},
              { name: 'Status' , prop: 'status'},
            ],

            body: (vaccinationSites, i) => {

              return (
                <tr style={{fontSize: '11px'}} className='clickable' data-id={vaccinationSites._id} onClick={ async (e) => {

                  await props.SetVaccinationSitesDetail(vaccinationSites._id);

                  props.toggle();
                   // props.GetDetail('vaccinationSites/detail', SET_DEVICE_DETAIL, vaccinationSites._id)
                   //   .then(data => {
                   //     // props.toggle();
                   //   });

                }}>
                  <td scope='col'>{ i + 1 }</td>
                  <td scope='col'>{ vaccinationSites.code }</td>
                  <td scope='col'>{ vaccinationSites.codeShort }</td>
                  <td scope='col'>{ vaccinationSites.name }</td>
                  <td scope='col'>{ vaccinationSites.type }</td>
                  <td scope='col'>{ vaccinationSites.ownership }</td>
                  <td scope='col'>{ vaccinationSites.address }</td>
                  <td scope='col'>{ vaccinationSites.status }</td>
                </tr>
              )
            }
          }}
        />
      </Fragment>
    );
}

const mapStateToProps = (state) => ({
  vaccinationSites: state.vaccinationSites
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetVaccinationSitesDetail,
  SetVaccinationSitesDefault,
})(VaccinationSitesTable);

