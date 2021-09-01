import React from 'react';
import { connect } from 'react-redux';

import {
	ArrangeDate,
	ArrangeName,
} from '../../actions/helpers/displayAction';
  
class RecordPrintableFormFront extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      route: "",
    }
  }

  render () {
	var record = {...this.props.record.record};
	var par = (record.endUser.userPAR)?this.props.ArrangeName(record.endUser.userPAR.name):record.userPAR;
	var co = (record.endUser.userCo)?this.props.ArrangeName(record.endUser.userCo.name):record.userCO;
	console.log(record);
	console.log(this.props.record.recordDefault);
	var arranged = {
		propertyCode: record.propertyCode,
		serialNo: record.serial,
		unitType: record.unitType,
		brand: record.brand,
		specs: record.specs.hWare.cpu,
		dateAcq: this.props.ArrangeDate(record.dateAcquired),
		purchased: record.purchased || "",
		donated: record.donated || "",
		endUser: par + " : C/O " + co,
		division: (typeof(record.office) == "object")?record.office.division:record.division,
		section: (typeof(record.office) == "object")?(record.office.section + "(" + record.office.code + ")"):(record.section + "(" + record.code + ")"),
		hardware: {
			motherBoard: record.specs.hWare.motherBoord,
			processors: record.specs.hWare.cpu,
			memCards: record.specs.hWare.ram + " RAM",
			hardDisk: record.specs.hWare.hdd,
			monitor: ((record.specs.hWare.monitor.brand + " ------ ")||"") + ((record.specs.hWare.monitor.size + " ------ ")||"") + ((record.specs.hWare.monitor.propertyCode + " ------ ")||"") + (record.specs.hWare.monitor.serial||""),
			ups: ((record.specs.hWare.hasOwnProperty("ups"))?(record.specs.hWare.ups.brand + " ------ "):"") + ((record.specs.hWare.hasOwnProperty("ups"))?(record.specs.hWare.ups.propertyCode + " ------ "):"") + ((record.specs.hWare.hasOwnProperty("ups"))?record.specs.hWare.ups.serial:""),
			avr: ((record.specs.hWare.hasOwnProperty("avr"))?(record.specs.hWare.avr.brand + " ------ "):"") + ((record.specs.hWare.hasOwnProperty("avr"))?(record.specs.hWare.avr.propertyCode + " ------ "):"") + ((record.specs.hWare.hasOwnProperty("avr"))?record.specs.hWare.avr.serial:""),
			keyboardMouse: ((record.specs.hWare.hasOwnProperty("keyboard"))?record.specs.hWare.keyboard.brand:"") + " - " + ((record.specs.hWare.hasOwnProperty("mouse"))?record.specs.hWare.mouse.brand:""),
			printers: ((record.specs.hWare.hasOwnProperty("printer"))?(record.specs.hWare.printer.name + " ------ "):"") + ((record.specs.hWare.hasOwnProperty("printer"))?record.specs.hWare.printer.serial:""),
			scanners: ((record.specs.hWare.hasOwnProperty("scanners"))?(record.specs.hWare.scanners.brand + " ------ "):"") + ((record.specs.hWare.hasOwnProperty("scanners"))?(record.specs.hWare.scanners.serial + " ------ "):"") + ((record.specs.hWare.hasOwnProperty("avr"))?record.specs.hWare.avr.propertyCode:""),
			dates: {...record.specs.hWare.dateChecked}
		},
		software: {
			os: record.specs.sWare.os.name + ((record.specs.sWare.os.name !="")?((record.specs.sWare.os.isLicensed)?" (Licensed)": " (Unlicensed)"):""),
			office: record.specs.sWare.msOffice.name + ((record.specs.sWare.msOffice.name !="")?((record.specs.sWare.msOffice.isLicensed)?" (Licensed)": " (Unlicensed)"):""),
			antivirus: record.specs.sWare.antiVirus.name + ((record.specs.sWare.antiVirus.name !="")?((record.specs.sWare.antiVirus.isLicensed)?" (Licensed)": " (Unlicensed)"):""),
			dates: {...record.specs.sWare.dateChecked},
		},
		correctiveAction: [...record.actions]

	};


	var staticData = {
		"SERVERS":    {os: "01-09-2020", office: "01-09-2020", antivirus: "01-09-2020"},
		"KM-ICT":     {os: "02-24-2020", office: "02-24-2020", antivirus: "02-24-2020"},
		"PLANNING":   {os: "03-13-2020", office: "03-13-2020", antivirus: "03-13-2020"},
		"HPR":        {os: "01-14-2020", office: "01-14-2020", antivirus: "01-14-2020"},
		"STATISTICS": {os: "02-26-2020", office: "02-26-2020", antivirus: "02-26-2020"},
		"STATISTICS": {os: "02-26-2020", office: "02-26-2020", antivirus: "02-26-2020"},
		"HEPO": 	  {os: "01-07-2020", office: "01-07-2020", antivirus: "01-07-2020"},
		"RD": 	 	  {os: "01-10-2020", office: "01-10-2020", antivirus: "01-10-2020"},
		"TB": 	 	  {os: "02-24-2020", office: "02-24-2020", antivirus: "02-24-2020"},
		"NON-COMM":   {os: "01-29-2020", office: "01-29-2020", antivirus: "01-29-2020"},
		"PDOHO-SDN":  {os: "01-06-2020", office: "01-06-2020", antivirus: "01-06-2020"},
		"HFDU":	 	  {os: "01-10-2020", office: "01-10-2020", antivirus: "01-10-2020"},
	};
	
	var tempDate = ((record.office.section||record.section) != "")?{...staticData[(record.office.section||record.section)]}:{os: "", office: "", antivirus: ""};

	console.log("------------------->>>>>>>>>>>>>>>.............:::");
	console.log(tempDate);
	console.log((record.office.section||record.section));


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
					<td style={{borderBottom: "1px solid #000000"}} colSpan={14} rowSpan="2" height="56" align="center" valign="middle"><b><font face="Lucida Sans" size="3" color="#000000">KNOWLEDGE MANAGEMENT- INFORMATION AND COMMUNICATION TECHNOLOGY<br/>IT CORRECTIVE &amp; PREVENTIVE MAINTENANCE MONITORING RECORD QUARTERLY CY: 2020</font></b></td>
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
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.hardware.dates.motherBoard) }</td>
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
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.hardware.dates.processors) }</td>
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
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.hardware.dates.memCards) }</td>
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
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.hardware.dates.hardDisk) }</td>
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
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.hardware.dates.monitor) }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="22" align="center" valign="middle"><b><font>AVR, UPS &amp; OTHERS</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Check for functionality and clean</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="31" valign="middle"><font>UPS:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.ups }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.hardware.dates.ups) }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="31" valign="middle"><font>AVR:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.avr }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.hardware.dates.avr) }</td>
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
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderLeft: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.hardware.dates.keyboardMouse) }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="28" align="center" valign="middle"><b><font>PRINTERS</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Clean and check Printer physical status</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="27" valign="middle"><font color="#000000">Specs:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.printers }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.hardware.dates.printers) }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="28" align="center" valign="middle"><b><font>SCANNERS</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Check for functionality and clean</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} height="28" valign="middle"><font color="#000000">Specs:</font></td>
					<td style={{border: "1px solid #000000"}} colSpan={4} align="center" valign="middle">{ arranged.hardware.scanners }</td>
					<td valign="middle"></td>
					<td style={{borderTop: "1px solid #000000", borderBottom: "1px solid #000000", borderLeft: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(arranged.hardware.dates.scanners) }</td>
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
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(/*arranged.software.dates.os*/ tempDate.os, false) }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000", textAlign:"center"}} colSpan={5} height="26" align="center" valign="middle"><b><font>OFFICE APPLICATIONS</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Check for functionality and activation</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000", textAlign:"center"}} colSpan={5} height="24" valign="middle">{ arranged.software.office }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(/*arranged.software.dates.office*/ tempDate.office, false) }</td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000"}} colSpan={5} height="26" align="center" valign="middle"><b><font>ANTIVIRUS, ANTI-MALWARE/SPYWARE</font></b></td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} valign="middle"><font>Update &amp; run antivirus definitions signatures</font></td>
					</tr>
				<tr>
					<td style={{border: "1px solid #000000", textAlign:"center"}} colSpan={5} height="24" valign="middle">{ arranged.software.antivirus }</td>
					<td valign="middle"></td>
					<td style={{border: "1px solid #000000"}} colSpan={8} align="center" valign="middle">{ this.props.ArrangeDate(/*arranged.software.dates.antivirus*/ tempDate.antivirus, false) }</td>
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
								<td style={{border: "1px solid #000000"}} colSpan={2} align="center" valign="middle" sdnum="1033;0;MM/DD/YY;@">{ this.props.ArrangeDate(data.date) }</td>
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
					<td style={{borderTop: "1px solid #000000"}} colSpan={14} height="28" align="right" valign="middle"><font>DOH-RO13-KM-ICT-QSOP-02 Form3 Rev 3</font></td>
					</tr>
			</tbody></table>
			<hr/>
      </div>

	);
  }
}

const mapStateToProps = (state) => ({
  record: state.record
});

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
})(RecordPrintableFormFront);
