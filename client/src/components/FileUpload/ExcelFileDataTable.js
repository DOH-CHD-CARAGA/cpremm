import React, { Component, useCallback } from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, Spinner, Col} from 'reactstrap';
import { FaUpload, FaChevronDown, FaChevronUp, FaCheck, FaTimes, FaCircleNotch} from 'react-icons/fa';
import {
    ToggleAlert,
} from './../../../actions/Helpers/alertAction.js';
import {
    saveSheetToDB,
    updateSheetStatus,
} from './../../../actions/fileUploadAction.js';
  
// import { useDropzone } from 'react-dropzone';

class ExcelFileDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wsToggle: [],
      
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);

  }

  toggleCollapse (ind) {

    var temp = [...this.state.wsToggle];

    temp[ind] = !temp[ind];

    this.setState({
      wsToggle: [...temp]
    })

  }

  render() {
    var keys = [];

    // if (this.props.uploadStatus == "uploading"){
    //     this.props.ToggleAlert("loading", "Loading File Data", true);
    // }


    return (
        <div className="row" id="excel-file-data-table">
            {
                this.props.fileUpload.allowedSheets.map((data, i) => {
                    return (
                        <div className="custom-container">
                        <div className="custom-container-title clickable toggler">
                            <strong onClick={() => {this.toggleCollapse(i);}}>
                                WORKSHEET { i + 1 } - {this.props.fileUpload.sheets[data].name}
                            </strong>

                            {
                                (this.props.fileUpload.sheetStatus[i])
                                    ?(this.props.fileUpload.sheetStatus[i] == 1)
                                        ?<span> 
                                            <FaUpload className = "icon" id="file-save-icon" onClick={() => {
                                                this.props.updateSheetStatus(i, 2);
                                                this.props.saveSheetToDB(this.props.fileUpload.sheets[data], i);
                                            }}/> 
                                        </span>
                                        :(this.props.fileUpload.sheetStatus[i] == 2)
                                                ?<span> <FaCircleNotch className = "icon rotate" id="file-loading-icon"/> </span>
                                                :(this.props.fileUpload.sheetStatus[i] == 3)
                                                    ? <span> <FaCheck className = "icon" id="file-save-success"/> </span>
                                                    : <span> <FaTimes className = "icon" id="file-save-error"/> </span>
                                    :""
                            }

                            <span onClick={() => {this.toggleCollapse(i);}}>
                            {
                                (this.state.wsToggle[i])
                                ?<FaChevronUp/>
                                :<FaChevronDown/>
                            }
                            </span>                            
                        </div>
                        <Collapse isOpen={this.state.wsToggle[i]}>
                            <div className="custom-container-body">
                                {
                                    (this.props.uploadStatus == "uploading")
                                        ?(this.props.fileUpload.sheets[data].data.length == 0)
                                            ?<span>Loading.....</span>
                                            :<table className="table table-hover table-primary">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>QTY</th>
                                                        <th>BRAND</th>
                                                        <th>MODEL</th>
                                                        <th>Price</th>
                                                        <th colSpan={15}>DATA</th>
                                                    </tr>            
                                                </thead>
            
                                                <tbody>
                                                    {
                                                        this.props.fileUpload.sheets[data].data.map((row, i) => {
                                                            keys = Object.keys(row);
                                                            return(
                                                                <tr>
                                                                    <td>{i+1}</td>
                                                                    <td>{row.qty}</td>
                                                                    <td>{row.brand}</td>
                                                                    <td>{row.model}</td>                                                                    
                                                                    <td>{row.cost}</td>                                                                   
                                                                </tr>            
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        :(this.props.fileUpload.sheets[data].data.length == 0)
                                            ?<span>No Data</span>
                                            :<table className="table table-hover table-primary">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>QTY</th>
                                                        <th>BRAND</th>
                                                        <th>MODEL</th>
                                                        <th>Price</th>
                                                        <th colSpan={20}>DATA</th>
                                                    </tr>            
                                                </thead>
            
                                                <tbody>
                                                    {
                                                        this.props.fileUpload.sheets[data].data.map((row, i) => {                                                            
                                                            keys = Object.keys(row);
                                                            return(
                                                                <tr>
                                                                    <td>{i+1}</td>
                                                                    {
                                                                        keys.map((k) => {
                                                                            return (k != "qty" && k != "brand" && k != "desc" && k != "model" && k != "cost")
                                                                                    ?(<td>{k + " : " + row[k]}</td>)
                                                                                    :(<td>{row[k]}</td>)
                                                                        })
                                                                    }
                                                                </tr>            
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                }
                                
                            </div>
                        </Collapse>
                        </div>          
                    )                
                })
            }

        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    fileUpload: state.fileUpload
})

export default connect(mapStateToProps, {
    ToggleAlert,
    saveSheetToDB,
    updateSheetStatus,
})(ExcelFileDataTable);
