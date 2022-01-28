import React from 'react';
import { connect } from 'react-redux';

import {
	ArrangeDate,
	ArrangeName,
	GetSafe,
} from '../../actions/helpers/displayAction';
  
import {
  SET_RECORD_VALUE_NEW,
} from '../../actions/types';

class RecordPrintableFormFront extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      route: "",
    }
  }

  render () {
	var record = {...this.props.recordNew.record};
	console.log(record);
	var par = (record.endUser.userPAR)?this.props.ArrangeName(record.endUser.userPAR.name):record.text.userPAR;
	var co = (record.endUser.userCO)?this.props.ArrangeName(record.endUser.userCO.name):record.text.userCO;
	var desktop = {...record.devices.desktop};
	var monitor = {...record.devices.monitor};
	var ups     = {...record.devices.ups};
	var avr     = {...record.devices.avr};
	var printer = {...record.devices.printer};
	var scanner = {...record.devices.scanner};
	console.log(record);
	console.log(par);
	console.log(co);
	console.log(this.props.recordNew.recordDefault);
	var arranged = {
		propertyCode: this.props.GetSafe(() => {return desktop.propertyCode}, ""),
		serialNo: this.props.GetSafe(() => {return desktop.serial}, ""),
		unitType: this.props.GetSafe(() => {return desktop.type}, ""),
		brand: this.props.GetSafe(() => {return desktop.brand}, ""),
		specs: this.props.GetSafe(() => {return desktop.specs.hWare.cpu}, ""),
		dateAcq: this.props.GetSafe(() => {return this.props.ArrangeDate(desktop.dateAcquired)}, ""),
		purchased: this.props.GetSafe(() => {return desktop.purchased}, ""),
		donated:  this.props.GetSafe(() => {return desktop.donated}, ""),
		endUser: this.props.GetSafe(() => {return par + " : C/O " + co}, ""),
		division: this.props.GetSafe(() => {return (record.office.hasOwnProperty("division"))?record.office.division:record.text.division}, ""),
		section: this.props.GetSafe(() => {return (record.office.hasOwnProperty("section"))?record.office.section:record.text.section}, ""),
		hardware: {
			motherBoard: this.props.GetSafe(() => {return desktop.brand}, ""),
			processors: this.props.GetSafe(() => {return desktop.specs.hWare.cpu}, ""),
			memCards: this.props.GetSafe(() => {return desktop.specs.hWare.ram + " RAM"}, ""),
			hardDisk: this.props.GetSafe(() => {return desktop.specs.hWare.hdd}, ""),
			monitor: this.props.GetSafe(() => {return ((monitor.brand || "") + " ------ ") + ((monitor.propertyCode || "") + " ------ ") + (monitor.serial||"")}, ""),
			ups: this.props.GetSafe(() => {return ((ups.brand || "") + " ------ ") + ((ups.propertyCode || "") + " ------ ") + (ups.serial ||"")}, ""),
			avr: this.props.GetSafe(() => {return ((avr.brand || "") + " ------ ") + ((avr.propertyCode || "") + " ------ ") + (avr.serial ||"")}, ""),
			keyboardMouse: "",
			printer: this.props.GetSafe(() => {return ((printer.brand||"") + " ------ ") + ((printer.propertyCode||"") + " ------ ") + (printer.serial||"")}, ""),
			scanner: this.props.GetSafe(() => {return ((scanner.brand||"") + " ------ ") + ((scanner.propertyCode||"") + " ------ ") + (scanner.serial||"")}, ""),
			dates: this.props.GetSafe(() => { return {...record.specs.hWare.dateChecked}}, {})
		},
		software: {
			os: this.props.GetSafe(() => { return desktop.specs.sWare.os.name }, "") + this.props.GetSafe(() => { return ((desktop.specs.sWare.os.name !="")?((desktop.specs.sWare.os.isLicensed)?" (Licensed)": " (Unlicensed)"):"")}, ""),
			office: this.props.GetSafe(() => { return desktop.specs.sWare.msOffice.name }, "") + this.props.GetSafe(() => { return ((desktop.specs.sWare.msOffice.name !="")?((desktop.specs.sWare.msOffice.isLicensed)?" (Licensed)": " (Unlicensed)"):"")}, ""),
			antivirus: this.props.GetSafe(() => { return desktop.specs.sWare.antiVirus.name }, "") + this.props.GetSafe(() => { return ((desktop.specs.sWare.antiVirus.name !="")?((desktop.specs.sWare.antiVirus.isLicensed)?" (Licensed)": " (Unlicensed)"):"")}, ""),
			dates: this.props.GetSafe(() => {return {...desktop.specs.sWare.dateChecked}}, {os: "", office: "", antivirus: ""}),
		},
		correctiveAction: [...record.actions]

	};

	console.log(arranged);
	var empty = [];

	for (var x = 0; x < (10 - arranged.correctiveAction.length); x++) {
		empty.push({});
	}

    return (
      <div id="record-form" className="entry-form">
			<table cellspacing="0" border="0" style={{margin:"auto"}}>
				<colgroup span="4" width={"68"}></colgroup>
				<colgroup width={"295"}></colgroup>
				<colgroup width={"14"}></colgroup>
				<colgroup width={"68"}></colgroup>
				<colgroup width={"57"}></colgroup>
				<colgroup width={"41"}></colgroup>
				<colgroup width={"16"}></colgroup>
				<colgroup width={"75"}></colgroup>
				<colgroup width={"19"}></colgroup>
				<colgroup width={"51"}></colgroup>
				<colgroup width={"43"}></colgroup>
				<tbody><tr>
					<td style={{borderBottom: "1px solid #000000"}} colSpan={14} rowSpan="2" height="56" align="center" valign="middle"><b><font face="Lucida Sans" size="3" color="#000000">KNOWLEDGE MANAGEMENT- INFORMATION AND COMMUNICATION TECHNOLOGY<br/>IT CORRECTIVE &amp; PREVENTIVE MAINTENANCE MONITORING RECORD QUARTERLY CY: 2022</font></b></td>
					</tr>
				<tr>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={2} height="28" valign="middle"><b><font>Property Code:</font></b></td>
					<td style={{border: "1px solid #000000"}} colSpan={3}><font>{ arranged.propertyCode }</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={2} valign="middle"><b><font>Serial No:</font></b></td>
					<td style={{border: "1px solid #000000"}} colSpan={7} valign="middle"><font>{ arranged.serialNo }</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={2} height="28" valign="middle"><b><font>Unit Type:</font></b></td>
					<td style={{border: "1px solid #000000"}} colSpan={3} valign="middle"><font>{ arranged.unitType }</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={2} valign="middle"><b><font>Brand:</font></b></td>
					<td style={{border: "1px solid #000000"}} colSpan={3} valign="middle"><font>{ arranged.brand }</font></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderLeft: "1px solid #000000"}} valign="middle"><b><font>Specs:</font></b></td>
					<td style={{border: "1px solid #000000"}} colSpan={3} valign="middle"><font>{ arranged.specs }</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={2} height="28" valign="middle"><b><font>Date Acquired:</font></b></td>
					<td style={{border: "1px solid #000000"}} colSpan={3} valign="middle" sdnum="1033;1033;MMM-YY"><font>{ arranged.dateAcq }</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={2} valign="middle"><b><font>Purchased:</font></b></td>
					<td style={{border: "1px solid #000000"}} colSpan={3} valign="middle"><font>{ arranged.purchased }</font></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderLeft: "1px solid #000000"}} valign="middle"><b><font>Donated:</font></b></td>
					<td style={{border: "1px solid #000000"}} colSpan={3} valign="middle"><font>{ arranged.donated }</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={2} height="28" valign="middle"><b><font>End User:</font></b></td>
					<td style={{border: "1px solid #000000"}} colSpan={3} valign="middle"><font>{ arranged.endUser }</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={2} valign="middle"><b><font>Division:</font></b></td>
					<td style={{border: "1px solid #000000"}} colSpan={3} valign="middle"><font>{ arranged.division }</font></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderLeft: "1px solid #000000"}} valign="middle"><b><font>Section:</font></b></td>
					<td style={{border: "1px solid #000000"}} colSpan={3} valign="middle"><font>{ arranged.section }</font></td>
					</tr>
				<tr>
					<td height="28" valign="middle"></td>
				</tr>
				<tr>
					<td  bgcolor="#D9D9D9" style={{border: "1px solid #000000", padding: "15px"}} height="23" valign="middle" colSpan={6} rowSpan="2" align="center"><b><font>DESCRIPTION COMPUTER HARDWARE AND PERIPHERALS</font></b></td>
					<td  bgcolor="#D9D9D9" style={{border: "1px solid #000000"}} colSpan={8} rowSpan="2" align="center" valign="middle"><b><font>FILL IN THE DATES OF ACTUAL CONDUCTED</font></b></td>
					</tr>
				<tr>
					</tr>
				<tr>
					<td style={{borderLeft: "1px solid #000000", borderRight: "1px solid #000000"}} colSpan={6} height="24" align="center" valign="middle"><b></b></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderLeft: "1px solid #000000"}} valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000"}} valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000"}} valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000"}} valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000"}} valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000"}} valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000"}} valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderRight: "1px solid #000000"}} valign="middle"></td>
				</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="29" align="center" valign="middle"><b><font>MOTHERBOARD</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Check physical condition, clean with vacuum cleaner and blower</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="30" valign="middle"><font>Specs:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.motherBoard }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate("") }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="24" align="center" valign="middle"><b><font>PROCESSORS</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Clean heatsink fans and remove clog dust</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="25" valign="middle"><font>Capacity:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.processors }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate("") }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="28" align="center" valign="middle"><b><font>MEMORY CARDS</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Clean contacts of the memory modules</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="35" valign="middle"><font>Capacity:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.memCards }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate("") }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="30" align="center" valign="middle"><b><font>HARD DISK</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Check disk space with tleast 25% free disk of the total drive</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="31" valign="middle"><font>Capacity:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.hardDisk }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate("") }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} rowSpan="2" height="28" align="center" valign="middle"><b><font>MONITOR</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} rowSpan="2" valign="middle"><font>Clean monitors &amp; check for functionality</font></td>
					</tr>
				<tr>
					<td valign="middle"></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="29" valign="middle"><font>Specs:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.monitor }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate("") }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="22" align="center" valign="middle"><b><font>AVR, UPS & OTHERS</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Check for functionality and clean</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="31" valign="middle"><font>UPS:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.ups }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate("") }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="31" valign="middle"><font>AVR:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.avr }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate("") }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="28" align="center" valign="middle"><b><font>KEYBOARDS &amp; MOUSE</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Check for functionality and clean</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="28" valign="middle"><font color="#000000">Specs:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.keyboardMouse }</td>
					<td valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderLeft: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate("") }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="28" align="center" valign="middle"><b><font>PRINTERS</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Clean and check Printer physical status</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="27" valign="middle"><font color="#000000">Specs:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.printer }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate("") }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="28" align="center" valign="middle"><b><font>SCANNERS</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Check for functionality and clean</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="28" valign="middle"><font color="#000000">Specs:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.scanner }</td>
					<td valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderLeft: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate("") }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="8" valign="middle"></td>
					<td valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderLeft: "1px solid #000000"}} colSpan={2} align="center" valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000"}} colSpan={2} align="center" valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000"}} colSpan={2} align="center" valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderRight: "1px solid #000000"}} colSpan={2} align="center" valign="middle"></td>
					</tr>
				<tr>
					<td  bgcolor="#D9D9D9" style={{border: "1px solid #000000"}} colSpan={5} height="37" align="center" valign="middle"><b><font>COMPUTER SOFTWARE: OPERATING SYSTEM &amp; APPLICATION</font></b></td>
					<td valign="middle"></td>
					<td  bgcolor="#D9D9D9" style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle"><b><font face="Lucida Sans">FILL IN THE ACTUAL DATE CONDUCTED</font></b></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="33" align="center" valign="middle"><b><font>OPERATING SYSTEM UPDATE</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Check and Run Windows Update (Critical Updates) if necessary</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000", textAlign: "center"}} colSpan={5} height="24" valign="middle">{ arranged.software.os }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.software.dates.os) }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000", textAlign:"center"}} colSpan={5} height="26" align="center" valign="middle"><b><font>OFFICE APPLICATIONS</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Check for functionality and activation</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000", textAlign:"center"}} colSpan={5} height="24" valign="middle">{ arranged.software.office }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.software.dates.office) }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="26" align="center" valign="middle"><b><font>ANTIVIRUS, ANTI-MALWARE/SPYWARE</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Update &amp; run antivirus definitions signatures</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000", textAlign:"center"}} colSpan={5} height="24" valign="middle">{ arranged.software.antivirus }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.software.dates.antivirus) }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} rowSpan="2" height="48" align="center" valign="middle"><b><font>End-User's Signature</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} rowSpan="2" align="center" valign="middle"></td>
					</tr>
				<tr>
					<td valign="middle"></td>
					</tr>
				<tr>
					<td height="22" valign="middle"></td>
					<td valign="middle"></td>
					<td valign="middle"></td>
					<td valign="middle"></td>
					<td valign="middle"></td>
					<td valign="middle"></td>
					<td valign="middle"></td>
					<td valign="middle"></td>
					<td valign="middle"></td>
					<td valign="middle"></td>
					<td valign="middle"></td>
					<td valign="middle"></td>
					<td valign="middle"></td>
					<td valign="middle"></td>
				</tr>
				<tr>
					<td  bgcolor="#D9D9D9" style={{borderTop: "1px solid #000000", borderLeft: "1px solid #000000", borderRight: "1px solid #000000"}} colSpan={14} height="28" align="center" valign="middle"><b><font>CORRECTIVE ACTION(S) TAKEN</font></b></td>
					</tr>
				<tr>
					<td bgcolor="#D9D9D9" style={{border: "1px solid #000000"}} colSpan={3} height="32" align="center" valign="middle"><b><font>PROPERTY CODE</font></b></td>
					<td bgcolor="#D9D9D9" style={{border: "1px solid #000000"}} colSpan={2} align="center" valign="middle"><b><font>ITEM </font></b></td>
					<td bgcolor="#D9D9D9" style={{border: "1px solid #000000"}} colSpan={3} align="center" valign="middle"><b><font>FINDINGS</font></b></td>
					<td bgcolor="#D9D9D9" style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle"><b><font>ACTION TAKEN</font></b></td>
					<td bgcolor="#D9D9D9" style={{border: "1px solid #000000"}} colSpan={2} align="center" valign="middle"><b><font>DATE</font></b></td>
					</tr>
				{
					arranged.correctiveAction.map((data, i) => {
						return(
							<tr>
								<td style={{border: "1px solid #000000"}} colSpan={3} height="26" align="center" valign="middle">{ data.propertyCode }</td>
								<td style={{border: "1px solid #000000"}} colSpan={2} align="center" valign="middle">{ data.item }</td>
								<td style={{border: "1px solid #000000"}} colSpan={3} align="center" valign="middle">{ data.findings }</td>
								<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle" sdnum="1033;0;@">{ data.actionTaken }</td>
								<td style={{border: "1px solid #000000"}} colSpan={2} align="center" valign="middle" sdnum="1033;0;MM/DD/YY;@">{ this.props.ArrangeDate(data.date,false) }</td>
							</tr>				
						);					
					})
				}
				{
					empty.map((data, i) => {
						return(
							<tr>
								<td style={{border: "1px solid #000000"}} colSpan={3} height="26" align="center" valign="middle"></td>
								<td style={{border: "1px solid #000000"}} colSpan={2} align="center" valign="middle"></td>
								<td style={{border: "1px solid #000000"}} colSpan={3} align="center" valign="middle"></td>
								<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle" sdnum="1033;0;@"></td>
								<td style={{border: "1px solid #000000"}} colSpan={2} align="center" valign="middle" sdnum="1033;0;MM/DD/YY;@"></td>
							</tr>				
						);					
					})
				}
				<tr>
					<td style={{borderTop: "1px solid #000000"}} colSpan={14} height="28" align="right" valign="middle"><font>DOH-RO13-KM-ICT-QSOP-02 Form3 Rev 2</font></td>
					</tr>
			</tbody></table>
			<hr/>
      </div>

	);
  }
}

const mapStateToProps = (state) => ({
  recordNew: state.recordNew
});

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetSafe,
})(RecordPrintableFormFront);
