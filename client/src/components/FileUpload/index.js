import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FaUpload, FaChevronDown, FaChevronUp} from 'react-icons/fa';
import XLSX from 'xlsx';
import { Input } from 'reactstrap';
import LabelInput from '../helpers/LabelInput';
import ExcelFileDataTable2 from './ExcelFileDataTable2';
import TempData from './temp';

import { 
  ArrangeRecord,
} from '../../actions/recordAction.js';

import { 
  ArrangeDevices,
} from '../../actions/deviceAction.js';

import {
  ToggleAlert,
} from './../../actions/helpers/alertAction.js';

import {
  arrangeSheetDataRecords,
  arrangeSheetDataAVR,
  arrangeSheetDataUPS,
  arrangeSheetDataScanner,
  arrangeSheetDataPrinter,
  arrangeSheetDataOffices,
  arrangeSheetDataEmployees,
} from './../../actions/fileUploadAction.js';
import { tsThisType } from '@babel/types';
          
class ItemEnrollmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: false,
      file: {
        name: "", type: "", size: 0
      },
      filesTemp: {},
      excel: {
        worksheets: [],
      },
      uploadStatus: "none",
      offices:  JSON.parse(localStorage.getItem('doh-offices')) || [],
      offices2: JSON.parse(localStorage.getItem('doh-offices2')) || [],
      records: JSON.parse(localStorage.getItem('doh-km-ict-records')) || [],
    };

    this.TriggerFilePicker = this.TriggerFilePicker.bind(this);
    this.updateWorkSheet = this.updateWorkSheet.bind(this);
    this.updateOffice = this.updateOffice.bind(this);

    this.filePick = React.createRef();
  }

  updateOffice (value, i) {
    console.log(value);
    var temp = this.state.offices2;
    temp[i] = {
      ...temp[i],
      code: value,
    };

    this.setState({
      offices2: temp
    })
  }


  TriggerFilePicker (e){
    this.filePick.current.click();
  }

  updateWorkSheet (name) {
    this.setState({
      excel: {
        ...this.state.excel,
        worksheets: [
          ...this.state.excel.worksheets,
          name
        ],
      },
      // wsToggle: [
      //   ...this.state.wsToggle,
      //   false
      // ]
    })
  }


  SetUploadedFile (e){

      var files = e.target.files;

      files = [...files]
      if (files.length > 0){
        this.setState({
          uploadedFile: true,
          file: {
            name: files[0].name,
            type: files[0].type,
            size: files[0].size/1000
          },
          files: files
        })
  
        var reader = new FileReader();

        reader.onloadstart = () => {
          this.props.ToggleAlert("loading", "Loading File Data");
          this.setState({
            uploadStatus: "uploading"
          })
        };
  
        reader.onload = (e) => {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: 'binary'
          });
    
          workbook.SheetNames.forEach((sheetName, i) => {

              var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

              if (sheetName == "Sheet1") {
                this.props.ArrangeDevices(XL_row_object);
                // this.props.ArrangeRecord(XL_row_object);
              }
              
              // if (this.state.file.name == "tbl_preventive_records.xls") {
              //   this.props.arrangeSheetDataRecords(XL_row_object, sheetName);
              // }

              // if (this.state.file.name == "tbl_avr.xls") {
              //   this.props.arrangeSheetDataAVR(XL_row_object, sheetName);
              // }

              // if (this.state.file.name == "tbl_ups.xls") {
              //   this.props.arrangeSheetDataUPS(XL_row_object, sheetName);
              // }

              // if (this.state.file.name == "tbl_scanner.xls") {
              //   this.props.arrangeSheetDataScanner(XL_row_object, sheetName);
              // }

              // if (this.state.file.name == "tbl_printers.xls") {
              //   this.props.arrangeSheetDataPrinter(XL_row_object, sheetName);
              // }

              // if (this.state.file.name == "tbl_employee.xls") {
              //   this.props.arrangeSheetDataEmployees(XL_row_object, sheetName);
              // }

          });    
        };

        reader.onloadend = () => {
          this.props.ToggleAlert("success", "File Data Successfully Loaded", true);
          this.setState({
            uploadStatus: "uploaded"
          })          
        };


    
        reader.readAsBinaryString(files[0]);
  
      }
      return;
  }

  componentDidMount(){
  }

  render() {

    /* FOR EMPLOYEES
    var f = false, l = false, d = false, s = false, split = [], is1Word = false, first = '', last = '';
    var tempF = "", tempL = "";
    console.log(TempData.kmictRecords);
    var tot = TempData.kmictRecords.length, tot2 = TempData.kmictRecords.length, tempN1;
    var sure = [], notSure = [], x = 0;

    for (let y = 0; y < TempData.kmictRecords.length; y++) {
      split = TempData.kmictRecords[y].userCO.split("/");
      split = split.join(" ");
      split = TempData.kmictRecords[y].userCO.split("-");
      split = split.join(" ");
      split = split.split(" ");
      is1Word = (split[split.length-1] === split[0]);
      first = split[0].toUpperCase();
      first = (first == "DR.")?split[1]:first;
      last = split[split.length-1].toUpperCase();
      last = (last == "III" || last == "II" || last == "I")?split[split.length-2].toUpperCase():last;

      tempN1 = 1;

      for (let z = 0; z < TempData.employees.length; z++) {
        tempF = TempData.employees[z].name.first.toUpperCase();
        tempL = TempData.employees[z].name.last.toUpperCase();

        if (is1Word) {
          if (tempF.includes(first) || tempL.includes(last)) {
            sure.push(TempData.employees[z]);  
            tempN1 = 0;        
          }
        } else if (tempF.includes(first) && tempL.includes(last)) {
            sure.push(TempData.employees[z]);   
            tempN1 = 0;         
        } else if (TempData.kmictRecords[y].userCO.toUpperCase().includes(tempF)) {
          notSure.push(TempData.employees[z].name);
        }

      }

      if (TempData.kmictRecords[y].userCO == "LIZA") {
        sure = [{...sure[1]}]
      }else if (TempData.kmictRecords[y].userCO == "GAIL") {
        sure = [{...sure[1]}]
      }else if (TempData.kmictRecords[y].userCO == "ANN") {
        sure = [{...sure[2]}]
      }else if (TempData.kmictRecords[y].userCO == "ALL") {
        sure = [];
        tempN1 = 1;
      }

      if (tempN1 == 1) {
        tot = tot - tempN1;
      }else {
        x++;
        if (sure.length > 1) {
        }
      }

      TempData.kmictRecords[y] = {
        ...TempData.kmictRecords[y],
        endUser: {
          ...TempData.kmictRecords[y].endUser,
          userCo: (sure[0])?sure[0]._id["$oid"]:"",
        }
      };





      notSure = [];
      sure = [];
    }
    console.log((TempData.kmictRecords));
    console.log(JSON.stringify(TempData.kmictRecords));
*/

/* FOR OFFICE
    for (let y = 0; y < TempData.kmictRecords.length; y++) {

      for (let z = 0; z < TempData.offices.length; z++) {
        if (
            (TempData.kmictRecords[y].division == TempData.offices[z].division && (TempData.kmictRecords[y].section == TempData.offices[z].code || TempData.kmictRecords[y].section == TempData.offices[z].section)) ||
            ((TempData.kmictRecords[y].section) == "PLANNING" && (TempData.offices[z].section) == "PLANNING" && (TempData.kmictRecords[y].division) == "RD/ARD" && (TempData.offices[z].division) == "ARD" ) ||
            ((TempData.kmictRecords[y].section) == "STATISTICS" && (TempData.offices[z].section) == "STATISTICS" && (TempData.kmictRecords[y].division) == "RD/ARD" && (TempData.offices[z].division) == "ARD" )
            ) {
          TempData.kmictRecords[y] = {
            ...TempData.kmictRecords[y],
            office: TempData.offices[z]._id["$oid"]
            // office: {...TempData.offices[z]}
          }
          break;
        }        
      }
    }
    var i = 0;
    for (let y = 0; y < TempData.kmictRecords.length; y++) {
      console.log(TempData.kmictRecords[y]);
      if (!TempData.kmictRecords[y].hasOwnProperty("office")) {
        i++;
        console.log((y + 1) + " ==================================================== " + i);
      }
    }


    console.log(i);
    console.log(JSON.stringify(TempData.kmictRecords));
    // console.log(TempData.kmictRecords);
    console.log(TempData.offices);
    */
    var tempOffices = [...this.state.offices];

    this.state.offices2.map((data, i) => {

      var ind;
      
      for (let x = 0; x < tempOffices.length; x++) {
        if (tempOffices[x].section == data.code) {
          tempOffices[x] = {
            ...tempOffices[x],
            exist: true,
          }
    
          break;
        }
      }

    });

    // console.log(JSON.stringify(TempData.kmictRecords));
    
    return (
      // <div id="item-file-upload">
      //   <legend>Content</legend>
      //   {
      //     (this.props.fileUpload.msg != "")
      //       ?<span>{"Loading.... (" + this.props.fileUpload.msg + ")"}</span>
      //       :""
      //   }
      //   <hr/>
      //   {
      //     (true)
      //     // (this.state.uploadStatus == "uploaded")
      //       ?<ExcelFileDataTable2 uploadStatus={this.state.uploadStatus}/>
      //       :""
      //   }
      // </div>

      // ================================================================


        <div id="item-file-upload" className="justify-content-center">
          <div className="custom-cards-container">
            <div className="custom-cards rounded-container box-shadow-container">
              <div className="row">
                <div className="col-md-4" id="svg-div">
                  <FaUpload onClick={this.TriggerFilePicker}/>
                  <input 
                    type="file" ref={this.filePick} hidden={true}
                    onChange={(e) => {
                      this.SetUploadedFile(e);
                    }}              
                  />
                </div>
                <div className="col-md-8" id="file-detail">
                  {
                    (this.state.uploadedFile) 
                      ?<div id="fd-1">

                        <LabelInput type="text" value={this.state.file.name} label="File Name: "/>
                        <div className="row">
                          <div className="col-md-6">
                            <LabelInput type="text" value={this.state.file.type} label="File Type: "/>
                          </div>
                          <div className="col-md-6">
                            <LabelInput type="text" value={this.state.file.size} label="File Size (KB): "/>
                          </div>
                        </div>
                        
                      </div>
                      :<div id="fd-2">
                        <span>
                            NO FILE UPLOADED
                        </span>                  
                      </div>
                  }
                </div>
              </div><br/>

{/* 
              <div>

                <table className="table table-hover table-primary">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Division</th>
                      <th>Section</th>
                      <th>Section</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.offices2.map((data, i) => {
                      // var officesTemp = [];
                      // this.state.offices.map((off, i2) => {

                      //   if (serial != ser) {
                      //     serialsOptTemp = serialsOptTemp.filter((s, i) => s.value != ser); 
                      //   }

                      // });

                      return (
                        <Fragment>
                          <tr style={{display:(data.visible)}}>
                            <td>{i + 1}</td>
                            <td>{data.division}</td>
                            <td>{data.section}</td>
                            <td>
                              <Input type="select" value={data.code} onChange={(inpt) => {
                                this.updateOffice(inpt.target.value, i);
                              }}>
                                <option>--- NONE ---</option>
                                {
                                  
                                  tempOffices.map((data, i) => {
                                    return (
                                      <option value={data.section}>{ ((data.hasOwnProperty("exist") && data.exist)?"* ":"") + data.division + " " + data.section }</option>
                                    )
                                  })
                                }
                              </Input>
                            </td>
                          </tr>
                        </Fragment>
                      )
                    })}
                  </tbody>
                </table>  
                <Col sm={{ size: 3 }} className="save-btn">
                  <Button size="md" className="button-orange-gradient" color="primary" onClick={()=> {
                      // localStorage.setItem('doh-offices2', JSON.stringify(this.state.offices2));
                  }}>SAVE OFFICES</Button>
                </Col>
              </div><br/><br/><br/>


              <div>

                <table className="table table-hover table-primary">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Code</th>
                      <th>PAR</th>
                      <th>CO</th>
                      <th>Division</th>
                      <th>Section</th>
                      <th>Brand</th>
                      <th>Serial</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.records.map((data, i) => {

                      return (
                        <Fragment>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{data.propertyCode}</td>
                            <td>{data.userPAR}</td>
                            <td>{data.userCO}</td>
                            <td>{data.division}</td>
                            <td>{data.section}</td>
                            <td>{data.brand}</td>
                            <td>{data.serial}</td>
                          </tr>
                        </Fragment>
                      )
                    })}
                  </tbody>
                </table>  
                <Col sm={{ size: 3 }} className="save-btn">
                  <Button size="md" className="button-orange-gradient" color="primary" onClick={()=> {
                      // localStorage.setItem('doh-offices2', JSON.stringify(this.state.offices2));
                  }}>SAVE RECORDS</Button>
                </Col>
              </div>
      */}
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fileUpload: state.fileUpload
})

export default connect(mapStateToProps, {
  arrangeSheetDataRecords,
  arrangeSheetDataAVR,
  ToggleAlert,
  arrangeSheetDataUPS,
  arrangeSheetDataScanner,
  arrangeSheetDataPrinter,
  arrangeSheetDataOffices,
  arrangeSheetDataEmployees,
  ArrangeRecord,
  ArrangeDevices,
})(ItemEnrollmentScreen);
