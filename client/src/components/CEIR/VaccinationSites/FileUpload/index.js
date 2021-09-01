import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FaUpload, FaCircleNotch, FaCheck, FaTimes, FaCopy } from 'react-icons/fa';
import XLSX from 'xlsx';
import LabelInput from '../../../helpers/LabelInput';

import {
	ToggleAlert,
} from './../../../../actions/helpers/alertAction.js';

import {
	SetValue,
} from './../../../../actions/helpers/displayAction.js';

import {
} from './../../../../actions/types.js';

import {
	ArrangeVaccinationSites,
} from './../../../../actions/vaccinationSitesAction.js';

class HFFileUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadedFile: false,
			file: {
				name: "", type: "", size: 0, ext: ""
			},
			filesTemp: {},
			excel: {
				worksheets: [],
			},
			uploadStatus: "none",
		};

		this.TriggerFilePicker = this.TriggerFilePicker.bind(this);
		this.updateWorkSheet = this.updateWorkSheet.bind(this);

		this.filePick = React.createRef();
	}

	TriggerFilePicker(e) {
		this.filePick.current.click();
	}

	updateWorkSheet(name) {
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


	SetUploadedFile(e) {

		var files = e.target.files;

		files = [...files]
		if (files.length > 0) {
			var ext = files[0].name.split(".");
			this.setState({
				uploadedFile: true,
				file: {
					name: files[0].name,
					type: files[0].type,
					size: files[0].size / 1000,
					ext: ext[ext.length - 1],
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

				var ext = this.state.file.name.split("."), found = false;
				ext = ext[ext.length - 1];
				workbook.SheetNames.forEach((sheetName, i) => {
					if (!found) {
						var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
						console.log("+++++++++++++++++++++++++++SSS)))");
						console.log(sheetName);
						console.log(XL_row_object);
						if (sheetName == "Sheet1") {
							// if (!(XL_row_object[0].hasOwnProperty("Lastname") && XL_row_object[0].hasOwnProperty("Firstname"))) {
								// XL_row_object.shift();
							// }
							// XL_row_object.shift();
	
							this.props.ArrangeVaccinationSites(XL_row_object);
							// found = true;
						}

					}
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

	componentDidMount() {
	}

	render() {

		const { toBeUploaded, resetUpload, uploadDetails } = this.props.healthFacility;
		console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
		console.log(this.state);

		if (resetUpload && this.state.uploadedFile) {
			this.setState({
				uploadedFile: false,
				file: {
					name: "", type: "", size: 0, ext: ""
				},
				filesTemp: {},
				excel: {
					worksheets: [],
				},
				uploadStatus: "none",
			});
			this.props.setResetUploadBool(false)
		}

		const uploadStatus = {
			success: <span> <FaCheck className="icon" id="file-save-success" /> </span>,
			uploading: <span> <FaCircleNotch className="icon rotate" id="file-loading-icon" /> </span>,
			error: <span> <FaTimes className="icon" id="file-save-error" /> </span>,
			duplicate: <span> <FaCopy className="icon" id="file-duplicate-icon"/> </span>,
		}

		return (

			<div id="item-file-upload" className="justify-content-center">
				<div className="custom-cards-container">
					<div className="custom-cards rounded-container box-shadow-container">
						<div className="row">
							<div className="col-md-2"></div>
							<div className="col-md-3" id="svg-div">
								<FaUpload onClick={this.TriggerFilePicker} />
								<input
									type="file" ref={this.filePick} hidden={true}
									onChange={(e) => {
										this.SetUploadedFile(e);
									}}
								/>
							</div>
							<div className="col-md-5" id="file-detail">
								{
									(this.state.uploadedFile)
										? <div id="fd-1">

											<LabelInput type="text" value={this.state.file.name} label="File Name: " />
											<div className="row">
												<div className="col-md-6">
													<LabelInput type="text" value={this.state.file.type} label="File Type: " />
												</div>
												<div className="col-md-6">
													<LabelInput type="text" value={this.state.file.size} label="File Size (KB): " />
												</div>
											</div>

										</div>
										: <div id="fd-2">
											<span>
												NO FILE UPLOADED
                        </span>
										</div>
								}
							</div>
							<div className="col-md-2"></div>
						</div><br />
						<hr />

						<div className="row">
							<div className="col-md-12">
								<table className="table table-hover table-primary">
									<thead>
										<tr>
											<th>#</th>
											<th>Code</th>
											<th>Code</th>
											<th>Name/City</th>
											<th>Type</th>
											<th>Ownership</th>
											<th>Address</th>
											<th>Status</th>
											<th>Upload Status</th>
										</tr>
									</thead>
									<tbody>
										{
											toBeUploaded.map((data, i) => {

												return (
													<tr className="clickable">
														<td>{i + 1}</td>
														<td>{data.code || ""}</td>
														<td>{data.codeShort || ""}</td>
														<td>{data.name || ""}</td>
														<td>{data.type || ""}</td>
														<td>{data.ownership || ""}</td>
														<td>{data.address || ""}</td>
														<td>{data.status || ""}</td>
														<td>
															{
																data.hasOwnProperty("uploadStatus")
																	? uploadStatus[data.uploadStatus]
																	: ""
															}
														</td>
													</tr>
												);
											})
										}
									</tbody>
								</table>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	healthFacility: state.healthFacility
})

export default connect(mapStateToProps, {
	ToggleAlert,
	SetValue,
	ArrangeVaccinationSites,
})(HFFileUpload);
