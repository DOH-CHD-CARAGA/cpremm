import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FaAngleDown, FaAngleUp, FaWpforms } from 'react-icons/fa';
import LabelInput from '../helpers/LabelInput';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../actions/helpers/displayAction';

import {
  SetJobOrderRequestDetail,
  SetJobOrderRequestDefault,
  SetJobOrderActionDefault,
  updateJobOrderRequestStatus,
} from '../../actions/jobOrderRequestAction';

import {
  SetValue,
} from '../../actions/helpers/displayAction';

import {
  SET_JOB_ORDER_REQUEST_VALUE
} from '../../actions/types';

import DataTable from '../helpers/DataTable';

class jobOrderRequestTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    console.log();
    return (

      <Fragment>

        <DataTable
          addData={() => {
            this.props.SetJobOrderRequestDefault();
            this.props.toggleModal("add");
          }}
          // addData={(this.props.isMaster)?() => {
          //   this.props.SetJobOrderRequestDefault();
          //   this.props.toggleModal("add");
          // }:null}
          title={this.props.title}
          filter={this.props.filter}
          api={{ get: "jobOrderRequest/get", search: "jobOrderRequest/get" }}
          dataBank={this.props.jobOrderRequest}
          reducers={this.props.reducers}
          search={{
            options: [
              { value: "jobOrderRequestID", text: "Job Order Request ID" },
              { value: "requestingPersonnel.name", text: "Requesting Personnel" },
              { value: "divSec", text: "Office" },
              { value: "device.type", text: "Device" },
              { value: "device.status", text: "Device Status" },
              { value: "device.serial", text: "Device Serial #" },
              { value: "device.propertyCode", text: "Device Property #" },
              { value: "status", text: "Status" },
            ],
            options2: {
              'device.type': [
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
              'device.status': [
                { text: " --- Select Device Status --- ", value: "" },
                { text: "In-Use", value: 1 },
                { text: "Waste", value: 0 },
              ]
            },     
            select: [], suggest: false,
          }
          }
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
              { name: "Job Order Request ID", prop: "jobOrderRequestID", selected: true },
              { name: "Requesting Personnel", prop: "requestingPersonnel.name" },
              { name: "Device", prop: "device.type" },
              { name: "Serial", prop: "device.serial" },
              { name: "Property Code", prop: "device.propertyCode" },
              { name: "Office", prop: "divSec" },
              { name: "Request Date", prop: "requestDate" },
              { name: "Status", prop: "device.status" },
              { name: "Check Up Result" },
              { name: "Form" },
              { name: "Report" },
              { name: "Status" },
              // { name: "Section" , prop: "text.section"},
              // { name: "Division" , prop: "text.division"},
              // { name: "Status" , prop: "status"},
            ],

            body: (jobOrderRequest, i) => {
              var done = jobOrderRequest.hasOwnProperty("technician") && ((jobOrderRequest.hasOwnProperty("technician") && jobOrderRequest.technician.seen != null) || (jobOrderRequest.hasOwnProperty("technician") && jobOrderRequest.technician.hasOwnProperty("dateAction")));
              console.log(":::::::::::::|||||||||||||========================");
              console.log(done);
              console.log(jobOrderRequest);
              return (
                <tr style={{ fontSize: "9px" }} data-id={jobOrderRequest._id} onClick={async (e) => {


                  // this.props.GetDetail("jobOrderRequest/detail", SET_JOB_ORDER_REQUEST_DETAIL, jobOrderRequest._id)
                  //   .then(data => {
                  //     // this.props.toggle();
                  //   });
                }}>
                  <td scope="col">{i + 1}</td>
                  <td scope="col">{jobOrderRequest.jobOrderRequestID}</td>
                  <td scope="col">{jobOrderRequest.requestingPersonnel.name}</td>
                  <td scope="col">{jobOrderRequest.hasOwnProperty("device") ? jobOrderRequest.device.type :""}</td>
                  <td scope="col">{jobOrderRequest.hasOwnProperty("device") ? jobOrderRequest.device.serial : ""}</td>
                  <td scope="col">{jobOrderRequest.hasOwnProperty("device") ? jobOrderRequest.device.propertyCode : ""}</td>
                  <td scope="col">{jobOrderRequest.requestingPersonnel.divSec}</td>
                  <td scope="col">{this.props.ArrangeDate(jobOrderRequest.requestDate, false)}</td>
                  <td scope="col">{["Waste", "In-Use", ""][jobOrderRequest.hasOwnProperty("device")?jobOrderRequest.device.status:2]}</td>
                  <td scope="col">{jobOrderRequest.technician.hasOwnProperty("actionDetails") ? jobOrderRequest.technician.actionDetails.checkUpResult : ""}</td>
                  <td scope="col" className="display-form-button"><FaWpforms onClick={async () => {
                    if (this.props.jobOrderRequest.jobOrderRequest._id != jobOrderRequest._id) {
                      this.props.SetJobOrderActionDefault();
                    }

                    await this.props.SetJobOrderRequestDetail(jobOrderRequest._id);
                    this.props.toggle("request");
                  }} /></td>
                  <td scope="col" className={"display-form-button " + ((!done) ? "icon-disabled" : "")}><FaWpforms onClick={async () => {
                    // await this.props.SetJobOrderRequestDetail(jobOrderRequest._id);
                    if (done) {
                      console.log("SSSSSSS");
                      await this.props.SetJobOrderRequestDetail(jobOrderRequest._id);
                      this.props.toggle("report");
                    }
                    // this.props.toggle();
                  }} /></td>

                  <td scope="col">

                    <LabelInput
                      value={jobOrderRequest.status} prop="status" type="select"
                      options={[
                        { text: "Pending", value: "pending" },
                        { text: "On Repair", value: "on-repair" },
                        { text: "Done", value: "done" },
                      ]}
                      onChange={(e) => {
                        // console.log(jobOrderRequest._id);
                        console.log(":::::::::::::::::::::::::::::::::::&&&&&&&&&&77");
                        console.log(e.target.value);
                        // this.props.updateJobOrderRequestStatus(e, SET_JOB_ORDER_REQUEST_VALUE);
                        this.props.updateJobOrderRequestStatus(jobOrderRequest._id, e.target.value);
                      }}
                    />

                  </td>
                </tr>
              )
            }
          }}
        />



      </Fragment>
    );
  }

}



const mapStateToProps = (state) => ({
  jobOrderRequest: state.jobOrderRequest
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetJobOrderRequestDetail,
  SetJobOrderRequestDefault,
  SetJobOrderActionDefault,
  SetValue,
  updateJobOrderRequestStatus,
})(jobOrderRequestTable);
