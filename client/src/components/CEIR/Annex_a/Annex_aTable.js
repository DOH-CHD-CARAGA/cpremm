import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../../actions/helpers/displayAction';

import {
  SetAnnex_aDetail,
  SetAnnex_aDefault,
} from '../../../actions/annex_aAction';

import DataTable from '../../helpers/DataTable';

const Annex_aTable = (props) =>  {
    var prov = {
      adn: "Agusan Del Norte",
      ads: "Agusan Del Sur",
      sdn: "Surigao Del Norte",
      sds: "Surigao Del Sur",
      pdi: "Province of Dinagat Islands",
    };
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetAnnex_aDefault();
            props.toggleModal('add');
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: 'admin/annex_a/get', search: 'admin/annex_a/get' }}
          dataBank = { props.annex_a }
          reducers = {props.reducers}
          search = {{
            options: [ 
              {value: 'annex_aID', text: 'Annex_a ID'}, 
              {value: 'Name', text: 'Name'}, 
            ],
            select: [], suggest: false,
          }}
          table = {{

            head: [
              { name: '#'},
              { name: 'Region'},
              { name: 'Province' , prop: 'province', selected: true},
              { name: 'City/Municipality'},
              { name: 'Service Capability(infirmary, Level I, II, or III Hospital)'},
              { name: 'Ownership (Private, LGU, DOH)'},
              { name: 'Name of Facility' , prop: 'facility'},
              { name: 'Number of Employees'},
            ],

            body: (annex_a, i) => {

              return (
                <tr style={{fontSize: '11px'}} className='clickable' data-id={annex_a._id} onClick={ async (e) => {

                  await props.SetAnnex_aDetail(annex_a._id);

                  props.toggle();
                }}>
                  <td scope='col'>{ i + 1 }</td>
                  <td scope='col'>{ "CARAGA" }</td>
                  <td scope='col'>{ prov[annex_a._id.province] }</td>
                  <td scope='col'>{ "" }</td>
                  <td scope='col'>{ (annex_a._id.facility.toLowerCase().includes("rhu") || annex_a._id.facility.toLowerCase().includes("rural"))?"RHU":"" }</td>
                  <td scope='col'>{ (annex_a._id.facility.toLowerCase().includes("rhu") || annex_a._id.facility.toLowerCase().includes("rural"))?"Government":"" }</td>
                  <td scope='col'>{ annex_a._id.facility }</td>
                  <td scope='col'>{ annex_a.count }</td>
                </tr>
              )
            }
          }}
        />
      </Fragment>
    );
}

const mapStateToProps = (state) => ({
  annex_a: state.annex_a
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetAnnex_aDetail,
  SetAnnex_aDefault,
})(Annex_aTable);

