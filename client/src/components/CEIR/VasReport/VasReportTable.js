import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../../actions/helpers/displayAction';

import {
  SetVasReportDetail,
  SetVasReportDefault,
} from '../../../actions/vasReportAction';

import DataTable from '../../helpers/DataTable';

const VasReportTable = (props) => {

  const { facilities } = props.hfPersonnel;
  var sorted = [
    ...facilities.adn,
    ...facilities.ads,
    ...facilities.sdn,
    ...facilities.sds,
    ...facilities.pdi
  ].sort();

  var arranged = [];

  for (let x = 0; x < sorted.length; x++) {
    arranged.push({
      text: sorted[x],
      value: sorted[x],
    });
  }
  return (

    <Fragment>

      <DataTable
        addData={() => {
          props.SetVasReportDefault();
          props.toggleModal('add');
        }}
        upload={{
          callback: () => {
            props.toggleUpload('upload');
          }
        }}
        title={props.title}
        filter={props.filter}
        api={{ get: 'ceir/vas-report/get', search: 'ceir/vas-report/get' }}
        dataBank={props.vasReport}
        reducers={props.reducers}
        search={{
          options: [
            { value: 'hfPersonnelID', text: 'HfPersonnel ID' },
            { value: 'province', text: 'Province' },
            { value: 'facility', text: 'Facility' },
            { value: 'category', text: 'Category' },
            { value: 'philHealthID', text: 'PhilHealth ID' },
            { value: 'pwdID', text: 'PWD ID' },
            { value: 'name', text: 'Name' },
            { value: 'address', text: 'Address' },
            // {value: 'contactNo', text: 'Contact No'}, 
          ],
          options2: {
            province: [
              { text: " --- Select Province --- ", value: "" },
              { text: "Agusan Del Norte", value: "adn", },
              { text: "Agusan Del Sur", value: "ads", },
              { text: "Surigao Del Norte", value: "sdn" },
              { text: "Surigao Del Sur", value: "sds", },
              { text: "Province of Dinagat Island", value: "pdi", },
            ],
            facility: [
              ...arranged
            ]
          },
          select: [], suggest: false,
        }}
        table={{

          head: [
            { name: '#' },
            { name: 'HFP ID', prop: 'hfPersonnelID', selected: true },
            { name: 'Province', prop: 'province' },
            { name: 'Facility', prop: 'facility' },
            { name: 'Category', prop: 'category' },
            { name: 'Name', prop: 'name.last' },
            { name: 'Sex', prop: 'sex' },
            { name: 'Profession', prop: 'employment.profession' },
          ],

          body: (hfPersonnel, i) => {

            return (
              <tr style={{ fontSize: '11px' }} className='clickable' data-id={hfPersonnel._id} onClick={async (e) => {

                props.toggle();

              }}>
                <td scope='col'>{i + 1}</td>
                <td scope='col'>{hfPersonnel.hfPersonnelID}</td>
                <td scope='col'>{(hfPersonnel.province) ? hfPersonnel.province.toUpperCase() : ""}</td>
                <td scope='col'>{hfPersonnel.facility || ""}</td>
                <td scope='col'>{hfPersonnel.category}</td>
                <td scope='col'>{props.ArrangeName(hfPersonnel.name)}</td>
                <td scope='col'>{hfPersonnel.sex}</td>
                <td scope='col'>{hfPersonnel.employment.profession}</td>
              </tr>
            )
          }
        }}
      />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  vasReport: state.vasReport,
  hfPersonnel: state.hfPersonnel,
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetVasReportDetail,
  SetVasReportDefault,
})(VasReportTable);

