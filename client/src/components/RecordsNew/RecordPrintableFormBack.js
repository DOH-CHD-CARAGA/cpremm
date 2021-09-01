import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, FormGroup} from 'reactstrap';
import { FaPlus, FaTimes } from 'react-icons/fa';
import LabelInput from '../helpers/LabelInput';

import {
  GetDate,
} from '../../actions/helpers/dateAction';

import {
  SET_RECORD_VALUE_NEW,
} from '../../actions/types';

class RecordPrintableFormBack extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      route: "",
    }
  }


  render () {
	console.log("-----------------------.............");
	console.log(this.props);
	var record = {...this.props.recordNew.record};
	var otherDevices = [...record.otherDevices]

    return (
      <div id="record-form" className="entry-form">
			<table cellspacing="0" border="0" style={{width: "100%", margin:"auto"}}>
				<colgroup span="2" width={"68"}></colgroup>
				<colgroup width={"101"}></colgroup>
				<colgroup span="2" width={"68"}></colgroup>
				<colgroup width={"104"}></colgroup>
				<colgroup span="2" width={"68"}></colgroup>
				<colgroup width={"60"}></colgroup>
				<colgroup width={"61"}></colgroup>
				<colgroup width={"55"}></colgroup>
				<colgroup width={"68"}></colgroup>
				<tbody><tr>
					<td style={{borderBottom: "1px solid #000000"}} colSpan="11" height="81" align="center" valign="middle"><b><font face="Arial Black" color="#000000">KNOWLEDGE MANAGEMENT - INFORMATION AND COMMUNICATION TECHNOLOGY IT CORRECTIVE &amp; PREVENTIVE MAINTENANCE MONITORING RECORD QUARTERLY CY:2021</font></b></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="6" rowSpan="3" height="121" align="center" valign="middle" bgcolor="#D9D9D9"><font face="Arial Black" color="#000000">ACTIVITIES</font></td>
					<td style={{border: "1px solid #000000"}} colSpan="5" rowSpan="1" height="51" align="left" valign="middle" bgcolor="#D9D9D9"><font face="Arial Black" color="#000000">CHECK FOR FUNCTIONALITY CHECKLIST</font></td>				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="5" rowSpan="2" align="center" valign="middle"><font face="Arial Black" color="#000000">REMARKS</font></td>
				</tr>
				<tr>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="6" height="38" align="left" valign="middle"><font face="Lucida Sans Unicode" color="#000000">Check connections.</font></td>
					<td style={{border: "1px solid #000000"}} align="center" valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan="4" align="center" valign="middle"></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="6" height="38" align="left" valign="middle"><font face="Lucida Sans Unicode" color="#000000">Check for physical status and cleanliness.</font></td>
					<td style={{border: "1px solid #000000"}} align="center" valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan="4" align="center" valign="middle"></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="6" rowSpan="2" height="73" align="left" valign="middle"><font face="Lucida Sans Unicode" color="#000000">Update master inventory computer assets list. Double check the serial numbers of CPU, Monitors, Printers, etc</font></td>
					<td style={{border: "1px solid #000000"}} rowSpan="2" align="center" valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan="4" rowSpan="2" align="center" valign="middle"></td>
				</tr>
				<tr>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="6" height="54" align="left" valign="middle"><font face="Lucida Sans Unicode" color="#000000">Check disk space with atleast 25% free disk of the total drive</font></td>
					<td style={{border: "1px solid #000000"}} align="center" valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan="4" align="center" valign="middle"></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="6" height="41" align="left" valign="middle"><font face="Lucida Sans Unicode" color="#000000">Update antivirus definitions  and runantivirus software</font></td>
					<td style={{border: "1px solid #000000"}} align="center" valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan="4" align="center" valign="middle"></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="6" height="41" align="left" valign="middle"><font face="Lucida Sans Unicode" color="#000000">Check OS and MS office application updates if any</font></td>
					<td style={{border: "1px solid #000000"}} align="center" valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan="4" align="center" valign="middle"></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="6" height="41" align="left" valign="middle"><font face="Lucida Sans Unicode" color="#000000">Check LAN connectivity</font></td>
					<td style={{border: "1px solid #000000"}} align="left" valign="middle"><b></b></td>
					<td style={{border: "1px solid #000000"}} colSpan="4" align="center" valign="middle"><b></b></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="6" height="38" align="left" valign="middle"><font face="Lucida Sans Unicode" color="#000000">Check physical condition, clean with  vacuum cleaner and blower</font></td>
					<td style={{border: "1px solid #000000"}} align="left" valign="middle"><b></b></td>
					<td style={{border: "1px solid #000000"}} colSpan="4" align="center" valign="middle"><b></b></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="3" height="38" align="left" valign="middle"><b><font face="Lucida Sans Unicode" color="#000000">IT - Incharge Signature</font></b></td>
					<td style={{border: "1px solid #000000"}} colSpan="8" align="center" valign="middle"></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="3" height="33" align="left" valign="middle"><font face="Lucida Sans Unicode" color="#000000">Assigned IP</font></td>
					<td style={{border: "1px solid #000000"}} colSpan="8" align="center" valign="middle"></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="3" height="33" align="left" valign="middle"><font face="Lucida Sans Unicode" color="#000000">OS Product Key if any:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan="8" align="center" valign="middle"></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="11" height="27" align="center" valign="middle" bgcolor="#F2F2F2"><b><font face="Lucida Sans Unicode">OTHER ICT EQUIPMENTS ISSUED</font></b></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="3" height="33" align="center" valign="middle"><b><i><font face="Lucida Sans Unicode">Item Description</font></i></b></td>
					<td style={{border: "1px solid #000000"}} colSpan="4" align="center" valign="middle"><b><i><font face="Lucida Sans Unicode">Specification</font></i></b></td>
					<td style={{border: "1px solid #000000"}} colSpan="2" align="center" valign="middle"><b><i><font face="Lucida Sans Unicode">Property Code</font></i></b></td>
					<td style={{border: "1px solid #000000"}} colSpan="2" align="center" valign="middle"><b><i><font face="Lucida Sans Unicode">Serial Numbers</font></i></b></td>
				</tr>
				{
					otherDevices.map((data, i) => {
						return (
							<tr>
								<td style={{border: "1px solid #000000", padding: "0 10px"}} colSpan="3" height="33" align="left" valign="middle"> { data.type } </td>
								<td style={{border: "1px solid #000000", padding: "0 10px"}} colSpan="4" align="center" valign="middle"> { data.brand } </td>
								<td style={{border: "1px solid #000000", padding: "0 10px"}} colSpan="2" align="center" valign="middle"> { data.propertyCode } </td>
								<td style={{border: "1px solid #000000", padding: "0 10px"}} colSpan="2" align="center" valign="middle"> { data.serial } </td>
							</tr>
						)
					})
				}
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="11" height="29" align="center" valign="middle" bgcolor="#F2F2F2"><b><font face="Lucida Sans Unicode" color="#000000">NOTES</font></b></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="5" height="26" align="left" valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan="6" align="center" valign="middle"></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="5" height="26" align="left" valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan="6" align="center" valign="middle"></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="5" height="26" align="left" valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan="6" align="center" valign="middle"></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan="5" height="26" align="center" valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan="6" align="center" valign="middle"></td>
				</tr>
				<tr>
					<td height="20" align="left" valign="middle"></td>
					<td align="left" valign="middle"></td>
					<td align="left" valign="middle"></td>
					<td align="left" valign="middle"></td>
					<td align="left" valign="middle"></td>
					<td align="left" valign="middle"></td>
					<td style={{borderTop: "1px solid #000000"}} colSpan="5" align="right" valign="middle"><font face="Lucida Sans Unicode" color="#000000">DOH-RO13-KM-ICT-QSOP-02 Form3 Rev 2</font></td>
				</tr>
			</tbody></table>
      </div>

	);
  }
}

const mapStateToProps = (state) => ({
  recordNew: state.recordNew
});

export default connect(mapStateToProps, {
  GetDate,
})(RecordPrintableFormBack);
