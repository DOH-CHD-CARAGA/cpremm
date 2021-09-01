import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FaExternalLinkAlt, FaMinusCircle } from 'react-icons/fa';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  GetSafe,
} from '../../actions/helpers/displayAction';

import {
  SET_RECORD_DETAIL_NEW
} from '../../actions/types';

import {
  SetRecordDefault,
  SetRecordDetail,
  SetRecordNewToPrintQR,
  UpdateSelected,
  } from '../../actions/recordNewAction';

import DataTable from '../helpers/DataTable';

const GetHeaderTemplate = () => {
  return (
    <Fragment>
      <th scope="col">PAR</th>
      <th scope="col">CO</th>
      <th scope="col">Prop</th>
      <th scope="col">Serial</th>
      <th scope="col">Status</th>
    </Fragment>
  )
}

const GetTableTDTemplate = ({ props, device }) => {
  console.log("++++++++++++++++++++++++++++++++++++++++++++++***************88");
  console.log(props);
  console.log(device);
  return (
    <Fragment>
      <td scope="col">{props.GetSafe(() => { return device.endUser.userPAR }, props.GetSafe(() => { return device.text.userPAR }, ""))}</td>
      <td scope="col">{props.GetSafe(() => { return device.endUser.userCO }, props.GetSafe(() => { return device.text.userCO }, ""))}</td>
      <td scope="col">{props.GetSafe(() => { return device.propertyCode }, "--------")}</td>
      <td scope="col">{props.GetSafe(() => { return device.serial }, "--------")}</td>
      <td scope="col">{props.GetSafe(() => { return (device.status) ? "In Use" : "Waste" }, "")}</td>
    </Fragment>
  )
}

const GetOtherDevicesList = ({ props, devices }) => {
  console.log("::::::::::::___________++=");
  console.log(devices);
  var deviceList = {
    laptop: [],
    monitor: [],
    printer: [],
    scanner: [],
    ups: [],
    avr: [],
    projector: [],
  };

  for (let x = 0; x < devices.length; x++) {
    // console.log("*************______________!!!!!!!!!!!!");
    // console.log(x);
    if (devices[x].hasOwnProperty("type")) {
      console.log(devices[x]);
      console.log(devices[x].type);

      if (devices[x].type != "") {
        deviceList[devices[x].type].push({ ...devices[x] });
      }

    }
  }

  var len = (deviceList.laptop.length > deviceList.monitor.length) ? deviceList.laptop.length : deviceList.monitor.length;
  len = (len > deviceList.printer.length) ? len : deviceList.printer.length;
  len = (len > deviceList.scanner.length) ? len : deviceList.scanner.length;
  len = (len > deviceList.ups.length) ? len : deviceList.ups.length;
  len = (len > deviceList.avr.length) ? len : deviceList.avr.length;
  len = (len > deviceList.projector.length) ? len : deviceList.projector.length;

  var temp = [];
  for (let x = 0; x < len; x++) {
    temp.push({});
  }

  return (
    <Fragment>
      {
        temp.map(({ }, i) => {
          return (
            <tr style={{ fontSize: "9px" }} className="clickable">
              <td scope="col"></td>
              <td scope="col"></td>
              <td scope="col"></td>

              <td scope="col"></td>
              <td scope="col"></td>
              <td scope="col"></td>
              <td scope="col"></td>
              <td scope="col"></td>

              <GetTableTDTemplate props={props} device={deviceList.monitor[i]} />
              <GetTableTDTemplate props={props} device={deviceList.laptop[i]} />
              <GetTableTDTemplate props={props} device={deviceList.printer[i]} />
              <GetTableTDTemplate props={props} device={deviceList.scanner[i]} />
              <GetTableTDTemplate props={props} device={deviceList.ups[i]} />
              <GetTableTDTemplate props={props} device={deviceList.avr[i]} />
              <GetTableTDTemplate props={props} device={deviceList.projector[i]} />
            </tr>
          )
        })
      }
    </Fragment>
  )
}

const recordTable = (props) => {
  console.log(props);
  return (

    <Fragment>
      {/* THIS DATATABLE IS FOR DOWNLOAD ONLY, NAKA HIDE NI SIYA */}
      <div id="downloadble-table" style={{ display: "none" }}>
        <DataTable
          addData={() => {
            props.SetRecordDefault();
            props.toggleModal("add");
          }}
          // addData={(props.isMaster)?() => {
          //   props.SetRecordDefault();
          //   props.toggleModal("add");
          // }:null}
          title={props.title}
          filter={props.filter}
          api={{ get: "record2/get", search: "record2/get" }}
          dataBank={props.recordNew}
          reducers={props.reducers}
          search={{
            options: [
              // {value: "propertyCode", text: "Property Code"},
              { value: "text.division", text: "Division" },
              { value: "text.section", text: "Section" },
              { value: "devices.desktop.propertyCode", text: "Property Code" },
              { value: "devices.desktop.serial", text: "Serial" },
              { value: "user", text: "User" },
            ],
            select: [], suggest: false,
          }}
          table={{
            head: () => {
              return (
                <Fragment>
                  <tr className="clickable" style={{ textAlign: "center" }}>
                    <th scope="col" rowSpan={2} style={{ verticalAlign: "middle" }}>#</th>
                    <th scope="col" rowSpan={2} style={{ verticalAlign: "middle" }}>Division</th>
                    <th scope="col" rowSpan={2} style={{ verticalAlign: "middle" }}>Section</th>
                    <th scope="col" colSpan={5}>Desktop</th>
                    <th scope="col" colSpan={5}>Monitor</th>
                    <th scope="col" colSpan={5}>Laptop</th>
                    <th scope="col" colSpan={5}>Printer</th>
                    <th scope="col" colSpan={5}>Scanner</th>
                    <th scope="col" colSpan={5}>UPS</th>
                    <th scope="col" colSpan={5}>AVR</th>
                    <th scope="col" colSpan={5}>Projector</th>
                  </tr>

                  <tr className="clickable" style={{ textAlign: "center" }}>

                    <GetHeaderTemplate />
                    <GetHeaderTemplate />
                    <GetHeaderTemplate />
                    <GetHeaderTemplate />
                    <GetHeaderTemplate />
                    <GetHeaderTemplate />
                    <GetHeaderTemplate />
                    <GetHeaderTemplate />

                  </tr>

                </Fragment>
              )
            },
            body: (record, i) => {
              return (
                <Fragment>
                  <tr style={{ fontSize: "9px" }} className="clickable" data-id={record._id}>
                    <td scope="col">{i + 1}</td>
                    <td scope="col">{props.GetSafe(() => { return (record.hasOwnProperty("office")) ? record.office.division : record.text.division }, "")}</td>
                    <td scope="col">{props.GetSafe(() => { return (record.hasOwnProperty("office")) ? record.office.section : record.text.section }, "")}</td>

                    <td scope="col">{props.GetSafe(() => { return (record.endUser.userPAR) ? props.ArrangeName(record.endUser.userPAR.name) : record.text.userPAR }, "")}</td>
                    <td scope="col">{props.GetSafe(() => { return (record.endUser.userCO) ? props.ArrangeName(record.endUser.userCO.name) : record.text.userCO }, "")}</td>
                    <td scope="col">{props.GetSafe(() => { return (record.devices.desktop.propertyCode != "" && record.devices.desktop.propertyCode != " ") ? record.devices.desktop.propertyCode : "--------" }, "")}</td>
                    <td scope="col">{props.GetSafe(() => { return (record.devices.desktop.serial != "" && record.devices.desktop.serial != " ") ? record.devices.desktop.serial : "--------" }, "")}</td>
                    <td scope="col">{props.GetSafe(() => { return (record.devices.desktop.status) ? "In Use" : "Waste" }, "")}</td>

                    <GetTableTDTemplate props={props} device={record.devices.monitor} />
                    <GetTableTDTemplate props={props} device={record.devices.laptop} />
                    <GetTableTDTemplate props={props} device={record.devices.printer} />
                    <GetTableTDTemplate props={props} device={record.devices.scanner} />
                    <GetTableTDTemplate props={props} device={record.devices.ups} />
                    <GetTableTDTemplate props={props} device={record.devices.avr} />
                    <GetTableTDTemplate props={props} device={{}} />
                  </tr>

                  <GetOtherDevicesList props={props} devices={record.otherDevices} />
                </Fragment>
              )
            }
          }}
        />
      </div>


      <DataTable
        addData={() => {
          props.SetRecordDefault();
          props.toggleModal("add");
        }}
        selection={{
          bool: true,
          count: props.recordNew.selected.length,
          selected: [...props.recordNew.selected]
        }}

        qrToggle={() => {
          props.SetRecordNewToPrintQR([...props.recordNew.toDisplay]);
          props.qrToggle();
        }}
        title={props.title}
        filter={props.filter}
        api={{ get: "record2/get", search: "record2/get" }}
        dataBank={props.recordNew}
        reducers={props.reducers}
        search={{
          options: [
            // {value: "propertyCode", text: "Property Code"},
            { value: "text.division", text: "Division" },
            { value: "text.section", text: "Section" },
            { value: "devices.desktop.propertyCode", text: "Property Code" },
            { value: "devices.desktop.serial", text: "Serial" },
            { value: "user", text: "User" },
            { value: "status", text: "Status" },
          ],
          options2: {
            status: [
              { text: " --- Select Status --- ", value: "" },
              { text: "In Use", value: 1, },
              { text: "Waste", value: 0, },
            ],
          },
          select: [], suggest: false,
        }}
        table={{
          // head: () => {
          //   return (
          //     <tr className="clickable">
          //       <th scope="col">#</th>
          //       <th scope="col">Division</th>
          //       <th scope="col">Section</th>
          //       <th scope="col">End User PAR</th>
          //       <th scope="col">End User CO</th>
          //       <th scope="col">Property Code</th>
          //       <th scope="col">Serial</th>
          //       <th scope="col">Status</th>
          //     </tr>
          //   )
          // },
          head: [
            { name: "#" },
            { name: "Division", prop: "text.division", selected: true },
            { name: "Section", prop: "text.section" },
            { name: "End User PAR", prop: "endUser.userPAR.name.last" },
            { name: "End User CO", prop: "endUser.userCO.name.last" },
            { name: "Property Code", prop: "devices.desktop.propertyCode" },
            { name: "Serial", prop: "devices.desktop.serial" },
            { name: "Status", prop: "devices.desktop.status" },
            { name: "", prop: "" },
          ],

          body: (record, i) => {
            return (
              <tr style={{ fontSize: "9px" }} className="clickable" data-id={record._id} onClick={async (e) => {

                if (e.target.type != "checkbox" && e.target.tagName != "path" && e.target.tagName != "svg") {
                  await props.SetRecordDetail(record._id);

                  props.toggle();
                }

                // props.GetDetail("record/detail", SET_RECORD_DETAIL_NEW, record._id)
                //   .then(data => {
                //     props.toggle();
                //   });
              }}>
                <td scope="col">{i + 1}</td>
                <td scope="col">{props.GetSafe(() => { return (record.hasOwnProperty("office")) ? record.office.division : record.text.division }, "")}</td>
                <td scope="col">{props.GetSafe(() => { return (record.hasOwnProperty("office")) ? record.office.section : record.text.section }, "")}</td>
                <td scope="col">{props.GetSafe(() => { return (record.endUser.userPAR) ? props.ArrangeName(record.endUser.userPAR.name) : record.text.userPAR }, "")}</td>
                <td scope="col">{props.GetSafe(() => { return (record.endUser.userCO) ? props.ArrangeName(record.endUser.userCO.name) : record.text.userCO }, "")}</td>
                <td scope="col">{props.GetSafe(() => { return (record.devices.desktop.propertyCode != "" && record.devices.desktop.propertyCode != " ") ? record.devices.desktop.propertyCode : "--------" }, "")}</td>
                <td scope="col">{props.GetSafe(() => { return (record.devices.desktop.serial != "" && record.devices.desktop.serial != " ") ? record.devices.desktop.serial : "--------" }, "")}</td>
                <td scope="col">{props.GetSafe(() => { return (record.devices.desktop.status) ? "In Use" : "Waste" }, "")}</td>
                <td scope="col" style={{ fontSize: "15px" }}>
                  <FaExternalLinkAlt onClick={() => {
                    props.UpdateSelected(record);
                  }} />
                </td>
              </tr>
            )
          }
        }}
      />


      <DataTable
        qrToggle={() => {
          props.SetRecordNewToPrintQR([...props.recordNew.selected]);
          props.qrToggle();
        }}
        title={"To Print QR"}
        filter={{}}
        api={{ get: "record2/get", search: "record2/get" }}
        dataBank={{
          toDisplay: [...props.recordNew.selected],
          count: props.recordNew.selected.length,
          page: 0,
          listPage: 0
        }}
        reducers={props.reducers}

        table={{
          head: [
            { name: "#" },
            { name: "Division", prop: "", selected: true },
            { name: "Section", prop: "" },
            { name: "End User PAR", prop: "" },
            { name: "End User CO", prop: "" },
            { name: "Property Code", prop: "" },
            { name: "Serial", prop: "" },
            { name: "Status", prop: "" },
            { name: "", prop: "" },
          ],

          body: (record, i) => {
            return (
              <tr style={{ fontSize: "9px" }} className="clickable">
                <td scope="col" className='d-lg-block d-md-none d-sm-none d-xs-none'>{i + 1}</td>
                <td scope="col" className='d-lg-block d-md-none d-sm-none d-xs-none'>{props.GetSafe(() => { return (record.hasOwnProperty("office")) ? record.office.division : record.text.division }, "")}</td>
                <td scope="col" className='d-lg-block d-md-none d-sm-none d-xs-none'>{props.GetSafe(() => { return (record.hasOwnProperty("office")) ? record.office.section : record.text.section }, "")}</td>
                <td scope="col">{props.GetSafe(() => { return (record.endUser.userPAR) ? props.ArrangeName(record.endUser.userPAR.name) : record.text.userPAR }, "")}</td>
                <td scope="col" className='d-lg-block d-md-none d-sm-none d-xs-none'>{props.GetSafe(() => { return (record.endUser.userCO) ? props.ArrangeName(record.endUser.userCO.name) : record.text.userCO }, "")}</td>
                <td scope="col">{props.GetSafe(() => { return (record.devices.desktop.propertyCode != "" && record.devices.desktop.propertyCode != " ") ? record.devices.desktop.propertyCode : "--------" }, "")}</td>
                <td scope="col">{props.GetSafe(() => { return (record.devices.desktop.serial != "" && record.devices.desktop.serial != " ") ? record.devices.desktop.serial : "--------" }, "")}</td>
                <td scope="col">{props.GetSafe(() => { return (record.devices.desktop.status) ? "In Use" : "Waste" }, "")}</td>
                <td scope="col" style={{ fontSize: "15px" }}>
                  <FaMinusCircle onClick={() => {
                    props.UpdateSelected(record, "-");
                  }} />
                </td>
              </tr>
            )
          }
        }}
      />

    </Fragment>
  );
}


const mapStateToProps = (state) => ({
  recordNew: state.recordNew
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  GetSafe,
  SetRecordDetail,
  SetRecordDefault,
  SetRecordNewToPrintQR,
  UpdateSelected,
  })(recordTable);
