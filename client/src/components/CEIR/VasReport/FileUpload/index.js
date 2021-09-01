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
	GetList,
} from './../../../../actions/helpers/displayAction.js';

import {

} from './../../../../actions/vasReportAction.js';

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

			multiple: {
				files: [
					// {name: "", type: "", size: 0, ext: ""},
				],
				worksheets: [],
			}
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


	async SetUploadedFile(e) {

		var files = e.target.files;
		console.log(":::::::::::::::::::::::::::::|||||||||||||||||||||");
		console.log(e.target);

		files = [...files]
		console.log(files);
		if (files.length > 0 && files.length == 1) {

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
				console.log("++++++++**************************************");
				console.log(console.log(workbook));

				var ext = this.state.file.name.split("."), found = false;
				ext = ext[ext.length - 1];

				workbook.SheetNames.forEach((sheetName, i) => {
					if (!found) {
						var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
	
						if ((sheetName == "Eligible Group" || sheetName == "Eligible Population") || (ext == "csv" && i == 0)) {
							console.log(":::::::::::::::::::::::::::::::::");
							console.log(Object.keys(XL_row_object[0]));
							console.log(XL_row_object);
							console.log(sheetName);
							console.log(ext);

							if (!(XL_row_object[0].hasOwnProperty("Lastname") && XL_row_object[0].hasOwnProperty("Firstname"))) {
								XL_row_object.shift();
							}
							XL_row_object.shift();
	
							// this.props.ArrangeFHPersonnel(XL_row_object);
							found = true;
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

		} else if (files.length > 1) {

			for (let y = 0, len = files.length; y < len; y++) {
				var ext = files[y].name.split(".");
				this.setState({
					uploadedFile: true,
					multiple: {
						...this.state.multiple,
						files: [...this.state.multiple.files, {
							name: files[y].name,
							type: files[y].type,
							size: files[y].size / 1000,
							ext: ext[ext.length - 1],
						}],
					},
					files: files
				})
				console.log("::::::::::::::::::::::::::::::::::::::::::");
				console.log(ext);
	
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
					console.log("++++++++**************************************");
					console.log(workbook);
					console.log(this.state);
					console.log(files);
					console.log(y);
	
					var ext = files[y].name.split("."), found = false;
					ext = ext[ext.length - 1];
	
					workbook.SheetNames.forEach((sheetName, i) => {
						if (!found) {
							var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		
							if ((sheetName == "Eligible Group" || sheetName == "Eligible Population") || (ext == "csv" && i == 0)) {
	
								console.log(":::::::::::::::::::::::::::::::::");
								console.log(XL_row_object);
								console.log(sheetName);
								console.log(ext);

								if (!(XL_row_object[0].hasOwnProperty("Lastname") && XL_row_object[0].hasOwnProperty("Firstname"))) {
									XL_row_object.shift();
								}
								XL_row_object.shift();
		
								// this.props.ArrangeFHPersonnelMultiple(XL_row_object);
								found = true;
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
	
				reader.readAsBinaryString(files[y]);
	
			}
		}
		return;
	}

	componentDidMount() {
	}

	render() {

		const { facilities, facilities2 } = this.props.hfPersonnel;
		const { toUpload, resetUpload, uploadDetails } = this.props.vasReport;
		console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
		console.log(this.state);

		var selectedFacility = facilities[uploadDetails.province].map((data, i) => {
			return {
				text: data,
				value: data,
			}
		});
		selectedFacility.unshift({text:"---- SELECT FACILITY ----", value: ""})
		console.log(selectedFacility);
		console.log(facilities2);


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
									multiple
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
											<th>HFP ID</th>
											<th>Category</th>
											<th>Name</th>
											<th>Contact_no</th>
											<th>Province</th>
											<th>MunCity</th>
											<th>Barangay</th>
											<th>Profession</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>
										{
											toUpload.map((data, i) => {
												console.log("::::::::::::::::::::******8888");
												console.log(data);
												return (
													<tr className={(data.hasOwnProperty("duplicates") && data.duplicates.length > 0)?"clickable":""} 
														onClick={() => {
															// this.props.toggleDuplicateModal(data)
														}}
													>
														<td>{i + 1}</td>
														<td>{data.hfPersonnelID}</td>
														<td>{data.Category}</td>
														<td>{data.Lastname + ", " + data.Firstname + " " + data.Middlename}</td>
														<td>{data.Contact_no}</td>
														<td>{data.Province}</td>
														<td>{data.MunCity}</td>
														<td>{data.Barangay}</td>
														<td>{data.Profession}</td>
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
	vasReport: state.vasReport,
	hfPersonnel: state.hfPersonnel,
})


export default connect(mapStateToProps, {
	ToggleAlert,
	SetValue,
	GetList,
})(HFFileUpload);
