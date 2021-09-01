import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../../actions/helpers/displayAction';

import {
  SetHealthFacilityDetail,
  SetHealthFacilityDefault,
} from '../../../actions/healthFacilityAction';

import DataTable from '../../helpers/DataTable';

const HealthFacilityTable = (props) =>  {
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetHealthFacilityDefault();
            props.toggleModal('add');
          }}
          upload={{
            callback: () => {
               props.toggleUpload();
            }
          }}                  
          title = {props.title}
          filter = {props.filter}
          api = {{ get: 'ceir/health-facility/get', search: 'ceir/health-facility/get' }}
          dataBank = { props.healthFacility }
          reducers = {props.reducers}
          search = {{
            options: [ 
              {value: 'name', text: 'Name'}, 
              {value: 'region', text: 'Region'}, 
              {value: 'province', text: 'Province'}, 
              {value: 'munCity', text: 'Municipality/City'}, 
              {value: 'healthFacilityID', text: 'Health Facility ID'}, 
              {value: 'category', text: 'Category'}, 
              {value: 'ownership', text: 'Ownership'}, 
            ],
            options2: {
              province: [
                {text: " --- Select Province --- ",  value: ""},
                {text: "Agusan Del Norte", value: "Agusan Del Norte",},
                {text: "Agusan Del Sur", value: "Agusan Del Sur",  },
                {text: "Surigao Del Norte", value: "Surigao Del Norte"},
                {text: "Surigao Del Sur", value: "Surigao Del Sur", },
                {text: "Province of Dinagat Island", value: "Province of Dinagat Island",},                 
              ],
              category: [
                {text: " --- Select Category --- ",  value: ""},
                {text: "RHU", value: "RHU"},
                {text: "CHO", value: "CHO"},
                {text: "MHO", value: "MHO"},
                {text: "PHO", value: "PHO"},
                {text: "DOH", value: "DOH"},
                {text: "Infirmary Hospital", value: "Infirmary Hospital"},
                {text: "Level 1 Hospital", value: "Level 1 Hospital"},
                {text: "Level 2 Hospital", value: "Level 2 Hospital"},
                {text: "Main Health Center", value: "Main Health Center"},
                {text: "Municipal Health Center", value: "Municipal Health Center"},
              ],
              ownership: [
                {text: " --- Select Ownership --- ",  value: ""},
                {text: "Government", value: "Government"},
                {text: "Private", value: "Private"},
              ],              
            },
            select: [], suggest: false,
          }}
          table = {{

            head: [
              { name: '#'},
              { name: 'HealthFacility ID' , prop: 'healthFacilityID', selected: true},
              { name: 'Region' , prop: 'region'},
              { name: 'Province' , prop: 'province'},
              { name: 'Municipality/City' , prop: 'munCity'},
              { name: 'Name' , prop: 'name'},
              { name: 'Category' , prop: 'category'},
              { name: 'Ownership' , prop: 'ownership'},
              // { name: 'BHW'},
              { name: 'Personnel'},
              // { name: 'Total'},
            ],

            body: (healthFacility, i) => {
              console.log(":::::::::::::::::::::::::::::::;;");
              console.log(healthFacility);
              return (
                <tr style={{fontSize: '11px'}} className='clickable' data-id={healthFacility._id} onClick={ async (e) => {

                  await props.SetHealthFacilityDetail(healthFacility._id);

                  props.toggle();
                   // props.GetDetail('healthFacility/detail', SET_DEVICE_DETAIL, healthFacility._id)
                   //   .then(data => {
                   //     // props.toggle();
                   //   });

                }}>
                  <td scope='col'>{ i + 1 }</td>
                  <td scope='col'>{ healthFacility.healthFacilityID }</td>
                  <td scope='col'>{ healthFacility.region }</td>
                  <td scope='col'>{ healthFacility.province }</td>
                  <td scope='col'>{ healthFacility.munCity }</td>
                  <td scope='col'>{ healthFacility.name }</td>
                  <td scope='col'>{ healthFacility.category }</td>
                  <td scope='col'>{ healthFacility.ownership }</td>
                  {/* <td scope='col'>{ healthFacility.bhw }</td> */}
                  <td scope='col'>{ healthFacility.pCount }</td>
                  {/* <td scope='col'>{ healthFacility.bhw + healthFacility.pCount }</td> */}
                </tr>
              )
            }
          }}
        />
      </Fragment>
    );
}

const mapStateToProps = (state) => ({
  healthFacility: state.healthFacility
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetHealthFacilityDetail,
  SetHealthFacilityDefault,
})(HealthFacilityTable);

