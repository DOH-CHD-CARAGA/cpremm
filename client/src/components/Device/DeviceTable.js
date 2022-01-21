import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FaExternalLinkAlt, FaMinusCircle } from 'react-icons/fa';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../actions/helpers/displayAction';

import {
  SetDeviceDetail,
  UpdateSelected,
} from '../../actions/deviceAction';

import {
  SET_DEVICE_DETAIL
} from '../../actions/types';

import {
  SetDeviceDefault,
  SetDeviceToPrintQR,
} from '../../actions/deviceAction';

import DataTable from '../helpers/DataTable';

const deviceTable = (props) => {
  // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^66");
  // console.log(props);
  return (

    <Fragment>

      <DataTable
        // addData={(props.isMaster)?() => {
        //   props.SetDeviceDefault();
        //   props.toggleModal("add");
        // }:null}
        qrToggle={() => {
          props.SetDeviceToPrintQR([...props.device.toDisplay]);
          props.qrToggle();
        }}
        addData={() => {
          props.SetDeviceDefault();
          props.toggleModal("add");
        }}
        selection={{
          bool: true,
          count: props.device.selected.length,
          selected: [...props.device.selected]
        }}
        title={props.title}
        filter={props.filter}
        api={{ get: "device/get", search: "device/get" }}
        dataBank={props.device}
        reducers={props.reducers}
        search={{
          options: [
            { value: "type", text: "Type" },
            { value: "user", text: "User" },
            { value: "section", text: "Section" },
            { value: "division", text: "Division" },
            { value: "propertyCode", text: "Property Code" },
            { value: "serial", text: "Serial" },
            { value: "brand", text: "Brand" },
            { value: "status", text: "Status" },
          ],
          options2: {
            type: [
              { text: " --- Select Device Type --- ", value: "" },
              { text: "Desktop", value: "desktop" },
              { text: "Laptop", value: "laptop" },
              { text: "Monitor", value: "monitor" },
              { text: "Printer", value: "printer" },
              { text: "Scanner", value: "scanner" },
              { text: "UPS", value: "ups" },
              { text: "AVR", value: "avr" },
              { text: "Router", value: "router" },
              { text: "Camera", value: "camera" },
              { text: "Speaker", value: "speaker" },
              { text: "Projector", value: "projector" },
              { text: "Tablet", value: "tablet" },
            ],
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
          //     <tr>
          //       <th scope="col">#</th>
          //       <th scope="col">type <FaAngleDown /> </th>
          //       <th scope="col">Serial <FaAngleDown /> </th>
          //       <th scope="col">Property Code <FaAngleDown /> </th>
          //       <th scope="col">PAR <FaAngleDown /> </th>
          //       <th scope="col">CO <FaAngleDown /> </th>
          //       <th scope="col">Section <FaAngleDown /> </th>
          //       <th scope="col">Division <FaAngleDown /> </th>
          //       <th scope="col">Status <FaAngleDown /> </th>
          //     </tr>
          //   )
          // },
          head: [
            { name: "#" },
            { name: "Type", prop: "type", selected: true },
            { name: "Serial", prop: "serial" },
            { name: "Brand", prop: "brand" },
            { name: "Model", prop: "model" },
            { name: "Property Code", prop: "propertyCode" },
            { name: "PAR", prop: "userPAR.name.last" },
            { name: "CO", prop: "userCO.name.last" },
            { name: "Division", prop: "text.division" },
            { name: "Section 1", prop: "text.section" },
            { name: "Section 2", prop: "office.section" },
            { name: "Status", prop: "status" },
            { name: "" },
          ],

          body: (device, i) => {

            return (
              <tr style={{ fontSize: "9px" }} className="clickable" data-id={device._id} onClick={async (e) => {

                console.log(e.target.tagName);

                if (e.target.type != "checkbox" && e.target.tagName != "path" && e.target.tagName != "svg") {
                  await props.SetDeviceDetail(device._id);

                  props.toggle();
                }
                // props.GetDetail("device/detail", SET_DEVICE_DETAIL, device._id)
                //   .then(data => {
                //     // props.toggle();
                //   });
              }}>
                <td scope="col">{i + 1}</td>
                <td scope="col">{device.type}</td>
                <td scope="col">{device.serial}</td>
                <td scope="col">{device.brand}</td>
                <td scope="col">{device.model}</td>
                <td scope="col">{device.propertyCode}</td>
                <td scope="col">{(device.userPAR) ? props.ArrangeName(device.userPAR.name) : device.text.userPAR}</td>
                <td scope="col">{(device.userCO) ? props.ArrangeName(device.userCO.name) : device.text.userCO}</td>
                <td scope="col">{(device.office != null && typeof (device.office) == "object") ? device.office.division : device.text.division}</td>
                <td scope="col">{(device.office != null && typeof (device.office) == "object") ? (device.office.section) : ""}</td>
                <td scope="col">{(device.text.section || "")}</td>
                <td scope="col">{(device.status == 1) ? "In Use" : "Waste"}</td>
                <td scope="col" style={{ fontSize: "15px" }}>
                  <FaExternalLinkAlt onClick={() => {
                    props.UpdateSelected(device);
                  }} />
                </td>
              </tr>
            )
          }
        }}
      />

      <DataTable
        // addData={(props.isMaster)?() => {
        //   props.SetDeviceDefault();
        //   props.toggleModal("add");
        // }:null}
        qrToggle={() => {
          props.SetDeviceToPrintQR([...props.device.selected]);
          props.qrToggle();
        }}
        title={"To Print QR"}
        filter={{}}
        api={{ get: "device/get", search: "device/get" }}
        dataBank={{
          toDisplay: [...props.device.selected],
          count: props.device.selected.length,
          page: 0,
          listPage: 0
        }}
        reducers={props.reducers}
        table={{
          head: [
            { name: "#" },
            { name: "Type", prop: "" },
            { name: "Serial", prop: "" },
            { name: "Brand", prop: "" },
            { name: "Model", prop: "" },
            { name: "Property Code", prop: "" },
            { name: "PAR", prop: "" },
            { name: "CO", prop: "" },
            { name: "Division", prop: "" },
            { name: "Section 1", prop: "" },
            { name: "Section 2", prop: "" },
            { name: "Status", prop: "" },
            { name: "", prop: "" },
          ],

          body: (device, i) => {

            return (
              <tr style={{ fontSize: "9px" }} className="clickable">
                <td scope="col">{i + 1}</td>
                <td scope="col">{device.type}</td>
                <td scope="col">{device.serial}</td>
                <td scope="col">{device.brand}</td>
                <td scope="col">{device.model}</td>
                <td scope="col">{device.propertyCode}</td>
                <td scope="col">{(device.userPAR) ? props.ArrangeName(device.userPAR.name) : device.text.userPAR}</td>
                <td scope="col">{(device.userCO) ? props.ArrangeName(device.userCO.name) : device.text.userCO}</td>
                <td scope="col">{(device.office != null && typeof (device.office) == "object") ? device.office.division : device.text.division}</td>
                <td scope="col">{(device.office != null && typeof (device.office) == "object") ? (device.office.section) : ""}</td>
                <td scope="col">{(device.text.section || "")}</td>
                <td scope="col">{(device.status == 1) ? "In Use" : "Waste"}</td>
                <td scope="col" style={{ fontSize: "15px" }}>
                  <FaMinusCircle onClick={() => {
                    props.UpdateSelected(device, "-");
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
  device: state.device
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetDeviceDetail,
  UpdateSelected,
  SetDeviceDefault,
  SetDeviceToPrintQR,
})(deviceTable);
