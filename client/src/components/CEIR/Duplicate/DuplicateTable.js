import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../../actions/helpers/displayAction';

import {
  SetDuplicateDetail,
  SetDuplicateDefault,
} from '../../../actions/duplicateAction';

import DataTable from '../../helpers/DataTable';

const DuplicateTable = (props) =>  {

    var duplicateData = {...props.duplicate.duplicateData};
  
    return (

      <Fragment>

        <DataTable
          addData={() => {
            props.SetDuplicateDefault();
            props.toggleModal('add');
          }}
          title = {props.title}
          filter = {props.filter}
          api = {{ get: 'hf-personnel/get-duplicates', search: 'hf-personnel/get-duplicates' }}
          dataBank = { props.duplicate }
          reducers = {props.reducers}
          search = {{
            options: [ 
              {value: 'Name', text: 'name'}, 
            ],
            select: [], suggest: false,
          }}
          table = {{

            head: [
              { name: '#'},
              { name: 'Name' , prop: 'name'},
              { name: 'Province'},
              { name: 'Facilities'},
              { name: "ID's"},
              { name: "Contact"},
              { name: 'Count' , prop: 'count'},
            ],

            body: (duplicate, i) => {
              console.log("::::::::::::::::::::::::::");
              var facilities     = {...duplicateData[duplicate]};
              var facilitiesKeys = Object.keys(duplicateData[duplicate]);
              var facList = [];
              var rows = [
                <tr> 
                  <td colSpan={7} style={{fontSize: "14px", fontWeight: "bolder", backgroundColor: "#1b1b8c", color: "white"}}>{duplicate.toUpperCase()}</td>
                </tr>
              ];

              for (let x = 0, len = facilitiesKeys.length; x < len; x++) {
                facList = [...duplicateData[duplicate][facilitiesKeys[x]]];

                rows.push(
                  <tr> 
                    <td colSpan={7} style={{fontSize: "13px", fontWeight: "bolder", backgroundColor: "#44447f", color: "white"}} className="clickable">{"" + (x + 1) + ". " + facilitiesKeys[x] + " ( " + facList.length + " )" }</td>
                  </tr>
                );                

                for (let y = 0, len2 = facList.length; y < len2; y++) {
                  rows.push(
                    <tr style={{fontSize: '11px'}} className={'clickable ' + ((facList[y].provinces.length == 1 && facList[y].facilities.length == 1)?"duoble-same-pf":"")} data-id={facList[y]._id} onClick={ async (e) => {
                      // await props.SetDuplicateDetail(facList[y]._id);
                      // props.toggle();
                      }}>
                      <td scope='col'>{ y + 1 }</td>
                      <td scope='col'>{ props.ArrangeName(facList[y]._id) }</td>
                      <td scope='col'>{ facList[y].provinces.join(" --- ") }</td>
                      <td scope='col'>{ facList[y].facilities.join(" --- ") }</td>
                      <td scope='col'>{ facList[y].uniqueIds.join(" --- ") }</td>
                      <td scope='col'>{ facList[y].contact.join(" --- ") }</td>
                      <td scope='col'>{ facList[y].count }</td>
                    </tr>
                  )
                }

              }
              // var provinces = "";
              // duplicate.provinces.map(prov => {
              //   provinces += prov + " --- ";
              // })

              // var facilities = "";
              // duplicate.facilities.map(fac => {
              //   facilities += fac + " --- ";
              // })

              // var uniqueIds = "";
              // duplicate.uniqueIds.map(fac => {
              //   uniqueIds += fac + " --- ";
              // })

              return rows;
            }
          }}
        />
      </Fragment>
    );
}

const mapStateToProps = (state) => ({
  duplicate: state.duplicate
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetDuplicateDetail,
  SetDuplicateDefault,
})(DuplicateTable);

