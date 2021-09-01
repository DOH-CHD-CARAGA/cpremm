import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfoGraph from '../helpers/InfoGraph';
import { FaDownload } from 'react-icons/fa';
import { Doughnut, Bar } from 'react-chartjs-2';

import {
  GetYear,
} from '../../actions/helpers/dateAction';

import {
  ArrangeDate,
} from '../../actions/helpers/displayAction';

import {
  GetDevicesDashboardNumbers,
} from '../../actions/deviceAction';
import ReactToExcel from 'react-html-table-to-excel';


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    this.props.GetDevicesDashboardNumbers();
  }


  render() {
    // const si = require('systeminformation');
 
    // // promises style - new since version 3
    // si.cpu()
    //     .then(data => console.log(data))
    //     .catch(error => console.error(error));
    var currentYear = this.props.GetYear();
    var previousYear = currentYear - 1;

    var { data, offices } = this.props.dashboard;
    var officesKeys = Object.keys(offices);

    var labels = Object.keys(data["2020"]);
    labels.shift(); // remove ALL
    labels.shift(); // remove UNSET
    var year   = {
      current: [],
      previous: [],
    };

    var type = {
      desktop: [], laptop: [], printer: [], monitor: [],
      scanner: [], projector: [], avr: [], ups: [],

      desktopPrev: [], laptopPrev: [], printerPrev: [], monitorPrev: [],
      scannerPrev: [], projectorPrev: [], avrPrev: [], upsPrev: [],
    },

    totDesktop= 0, totLaptop= 0, totPrinter= 0, totMonitor= 0, 
    totScanner= 0, totUps= 0, totAvr= 0, totProjector= 0,
    
    totDesktopPrev= 0, totLaptopPrev= 0, totPrinterPrev= 0, totMonitorPrev= 0,
    totScannerPrev= 0, totUpsPrev= 0, totAvrPrev= 0, totProjectorPrev= 0,

    tempLaptop = 0, tempDesktop = 0, tempPrinter = 0, tempMonitor = 0, 
    tempScanner = 0, tempUps = 0, tempAvr = 0, tempProjector = 0;
    
    for (let x = 0; x < labels.length; x++) {
      tempLaptop    = data["2020"][labels[x]].laptop    + data["other"][labels[x]].laptop;
      tempDesktop   = data["2020"][labels[x]].desktop   + data["other"][labels[x]].desktop;
      tempPrinter   = data["2020"][labels[x]].printer   + data["other"][labels[x]].printer;
      tempMonitor   = data["2020"][labels[x]].monitor   + data["other"][labels[x]].monitor;
      tempScanner   = data["2020"][labels[x]].scanner   + data["other"][labels[x]].scanner;
      tempUps       = data["2020"][labels[x]].ups       + data["other"][labels[x]].ups;
      tempAvr       = data["2020"][labels[x]].avr       + data["other"][labels[x]].avr;
      tempProjector = data["2020"][labels[x]].projector + data["other"][labels[x]].projector;


      year.current.push((
        tempLaptop +
        tempDesktop +
        tempPrinter +
        tempMonitor +
        tempScanner +
        tempUps +
        tempAvr +
        tempProjector
      ));
      
      year.previous.push(
        data["other"][labels[x]].laptop +
        data["other"][labels[x]].desktop +
        data["other"][labels[x]].printer +
        data["other"][labels[x]].monitor +
        data["other"][labels[x]].scanner +
        data["other"][labels[x]].ups +
        data["other"][labels[x]].avr +
        data["other"][labels[x]].projector 
      );

      // if (labels[x] != "ALL") {
        // year.current.push((data["2020"][labels[x]].all + data["other"][labels[x]].all) - tempLaptop);
        // year.previous.push((data["other"][labels[x]].all) - data["other"][labels[x]].laptop);
      // }else {
      //   year.current.push(data["2020"].ALL);
      //   year.previous.push(data["other"].ALL);
      // }

      // totDesktop += tempDesktop;
      // totLaptop += tempLaptop;
      // totPrinter += tempPrinter;

      type.desktop.push(tempDesktop);
      type.laptop.push(tempLaptop);
      type.printer.push(tempPrinter);
      type.monitor.push(tempMonitor);
      type.scanner.push(tempScanner);
      type.projector.push(tempProjector);
      type.avr.push(tempAvr);
      type.ups.push(tempUps);

      type.laptopPrev.push(data["other"][labels[x]].laptop);
      type.desktopPrev.push(data["other"][labels[x]].desktop);
      type.printerPrev.push(data["other"][labels[x]].printer);
      type.monitorPrev.push(data["other"][labels[x]].monitor);
      type.scannerPrev.push(data["other"][labels[x]].scanner);
      type.upsPrev.push(data["other"][labels[x]].ups);
      type.avrPrev.push(data["other"][labels[x]].avr);
      type.projectorPrev.push(data["other"][labels[x]].projector);

      // type.desktopPrev.push(data["other"][labels[x]].desktop);
      // type.laptopPrev.push(data["other"][labels[x]].laptop);
      // type.printerPrev.push(data["other"][labels[x]].printer);

    }
    console.log(data);
    console.log(labels);
    console.log(year);
    console.log(type);

    var currSum = 0, prevSum = 0;

    for (let x = 0; x < labels.length; x++) {
      currSum += year.current[x] || 0;
      prevSum += year.previous[x] || 0;
      
      totDesktop   += type.desktop[x];
      totLaptop    += type.laptop[x];
      totPrinter   += type.printer[x];
      totMonitor   += type.monitor[x];
      totScanner   += type.scanner[x];
      totProjector += type.projector[x];
      totAvr       += type.avr[x];
      totUps       += type.ups[x];

      totDesktopPrev   += type.desktopPrev[x];
      totLaptopPrev    += type.laptopPrev[x];
      totPrinterPrev   += type.printerPrev[x];
      totMonitorPrev   += type.monitorPrev[x];
      totScannerPrev   += type.scannerPrev[x];
      totProjectorPrev += type.projectorPrev[x];
      totAvrPrev       += type.avrPrev[x];
      totUpsPrev       += type.upsPrev[x];

    }


    var totCurr = 0, totPrev = 0, 
        totDCurr = 0, totPCurr = 0, totLCurr = 0, totMCurr = 0, totProjCurr = 0, totSCurr = 0, totACurr = 0, totUCurr = 0, 
        totDPrev = 0, totPPrev = 0, totLPrev = 0, totMPrev = 0, totProjPrev = 0, totSPrev = 0, totAPrev = 0, totUPrev = 0;

    return (
      <div>
        <div id="dashboard" className="justify-content-center">
          <div className="custom-cards-container">
            <div className="custom-cards rounded-container box-shadow-container">


              <div className="row">
                <div className="row col-md-8">
                  <Doughnut data={{
                    datasets: [{
                      data: [212, 22, 73, 150, 132, 20],
                      backgroundColor: [
                      '#1395ba',
                      '#0d3c55',
                      '#c02e1d',
                      '#f16c20',
                      '#ebc844',
                      '#a2b86c',
                      '#435a08'
                      ],
                    }],
                    labels:["DESKTOP", "LAPTOP", "PRINTER", "UPS", "AVR", "SCANNER"],
                    text: '23%'            
                  }} />
                </div>

                <div className="row col-md-4">
                  <div className="col-md-12 custom-container">
                    <div className="custom-container-title">
                      CURRENT YEAR TOTAL
                    </div>
                    <div className="custom-container-body">
                      <h1 className="report-number">{currSum + 524}</h1>
                    </div>
                  </div>

                  <div className="col-md-12 custom-container">
                    <div className="custom-container-title">
                      PREVIOUS YEAR TOTAL
                    </div>
                    <div className="custom-container-body">
                      <h1 className="report-number">{prevSum + 437}</h1>
                    </div>
                  </div>

                </div>
              </div><br/><br/>

              <div className="row">
                <div className="col-md-8">
                  <Bar data={
                    {
                      labels: ['DESKTOP', 'LAPTOP', 'PRINTER', 'UPS', 'AVR', 'SCANNER'],
                      datasets: [
                        {
                          label: 'In-Use',
                          data: [12, 19, 3, 5, 2, 3],
                          backgroundColor: '#1a8d5f',
                        },
                        {
                          label: 'Waste',
                          data: [2, 3, 20, 5, 1, 4],
                          backgroundColor: '#878c8a',
                        },
                      ],
                    }
                  } options={
                    {
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                            },
                          },
                        ],
                      },
                    }
                  } />
                </div>              
              
                <div className="row col-md-4">
                  <div className="col-md-12 custom-container">
                    <div className="custom-container-title">
                      TOTAL IN USE
                    </div>
                    <div className="custom-container-body">
                      <h1 className="report-number">{currSum + 524}</h1>
                    </div>
                  </div>

                  <div className="col-md-12 custom-container">
                    <div className="custom-container-title">
                      TOTAL WASTE
                    </div>
                    <div className="custom-container-body">
                      <h1 className="report-number">{prevSum + 437}</h1>
                    </div>
                  </div>

                </div>              

              </div>

              <div className="col-md-12" style={{marginTop: "20px"}}>
                <InfoGraph 
                  type="Bar"
                  title="Devices" 
                  data={{
                    // labels:[...bname],
                    labels:[...(labels.slice(0,20))],
                    datasets: [
                      {
                        'label': previousYear,
                        'data':[...(year.previous.slice(0,20))],
                        'backgroundColor': "#35395e",
                      },
                      {
                        'label': currentYear,
                        'data':[...(year.current.slice(0,20))],
                        'backgroundColor': "#1a8d5fd9",
                      },
                    ]
                  }} 
                  options={{
                    "responsive": true,
                    "animation": {
                        "duration": 1500
                    },
                    "hover": {
                        "animationDuration": 0
                    },
                    "responsiveAnimationDuration": 0,
                    "scales": {
                      "xAxes":[{"ticks":{"autoSkip":false}}]
                    }
                  }} 
                  changeDate={(filter)=>{
                    console.log(filter);
                    this.props.getSoldNumbers({y: filter.year*1, m: filter.month*1});
                  }}
                />
              </div>
              
              <div className="col-md-12">
                <InfoGraph 
                  type="Bar"
                  title="Devices (Cont)" 
                  data={{
                    // labels:[...bname],
                    labels:[...(labels.slice(20, 41))],
                    datasets: [
                      {
                        'label': previousYear,
                        'data':[...(year.previous.slice(20, 41))],
                        'backgroundColor': "#35395e",
                      },
                      {
                        'label': currentYear,
                        'data':[...(year.current.slice(20, 41))],
                        'backgroundColor': "#1a8d5fd9",
                      },
                    ]
                  }} 
                  options={{
                    "responsive": true,
                    "animation": {
                        "duration": 1500
                    },
                    "hover": {
                        "animationDuration": 0
                    },
                    "responsiveAnimationDuration": 0,
                    "scales": {
                      "xAxes":[{"ticks":{"autoSkip":false}}]
                    }
                  }} 
                  changeDate={(filter)=>{
                    console.log(filter);
                    this.props.getSoldNumbers({y: filter.year*1, m: filter.month*1});
                  }}
                />
              </div>

              <div className="row">

                {/* <div className="col-md-12">
                  <table className="table-count table table-hover table-striped">
                    <thead>
                      <tr>
                        <th rowSpan={2} colSpan={1}>OFFICE</th>
                        <th colSpan={9}>TOTAL CURRENT</th>
                        <th colSpan={9}>TOTAL PREVIOUS (2019)</th>
                      </tr>
                      <tr>
                        <th>ALL</th>
                        <th>Desktop</th>
                        <th>Laptop</th>
                        <th>Printer</th>
                        <th>Monitor</th>
                        <th>Scanner</th>
                        <th>Projector</th>
                        <th>Ups</th>
                        <th>Avr</th>
                        <th>ALL</th>
                        <th>Desktop</th>
                        <th>Laptop</th>
                        <th>Printer</th>
                        <th>Monitor</th>
                        <th>Scanner</th>
                        <th>Projector</th>
                        <th>Ups</th>
                        <th>Avr</th>
                      </tr>
                    </thead>
                    <tbody>
                      { 
                        labels.map((label, i) => {
                          totCurr += year.current[i];
                          totPrev += year.previous[i];
                          
                          totDCurr    += type.desktop[i];
                          totPCurr    += type.printer[i];
                          totLCurr    += type.laptop[i];
                          totMCurr    += type.monitor[i];
                          totProjCurr += type.projector[i];
                          totSCurr    += type.scanner[i];
                          totACurr    += type.avr[i];
                          totUCurr    += type.ups[i];

                          totDPrev    += type.desktop[i];
                          totPPrev    += type.printer[i];
                          totLPrev    += type.laptop[i];
                          totMPrev    += type.monitor[i];
                          totProjPrev += type.projector[i];
                          totSPrev    += type.scanner[i];
                          totAPrev    += type.avr[i];
                          totUPrev    += type.ups[i];

                  
                          return(
                            <tr className={((year.current[i] != year.previous[i]))?"withChanges":""}>
                              <td>{label}</td>
                              <td>{year.current[i]}</td>
                              <td>{type.desktop[i]}</td>
                              <td>{type.laptop[i]}</td>
                              <td>{type.printer[i]}</td>
                              <td>{type.monitor[i]}</td>
                              <td>{type.scanner[i]}</td>
                              <td>{type.projector[i]}</td>
                              <td>{type.ups[i]}</td>
                              <td>{type.avr[i]}</td>

                              <td>{year.previous[i]}</td>
                              <td>{type.desktopPrev[i]}</td>
                              <td>{type.laptopPrev[i]}</td>
                              <td>{type.printerPrev[i]}</td>
                              <td>{type.monitorPrev[i]}</td>
                              <td>{type.scannerPrev[i]}</td>
                              <td>{type.projectorPrev[i]}</td>
                              <td>{type.upsPrev[i]}</td>
                              <td>{type.avrPrev[i]}</td>
                            </tr>
  
                          )
                        })
                      }
                      <tr>
                        <td><strong>TOTAL</strong></td>
                        <td><strong>{totCurr}</strong></td>
                        <td><strong>{totDCurr}</strong></td>
                        <td><strong>{totLCurr}</strong></td>
                        <td><strong>{totPCurr}</strong></td>
                        <td><strong>{totMCurr}</strong></td>
                        <td><strong>{totSCurr}</strong></td>
                        <td><strong>{totProjCurr}</strong></td>
                        <td><strong>{totUCurr}</strong></td>
                        <td><strong>{totACurr}</strong></td>

                        <td><strong>{totPrev}</strong></td>
                        <td><strong>{totDPrev}</strong></td>
                        <td><strong>{totLPrev}</strong></td>
                        <td><strong>{totPPrev}</strong></td>
                        <td><strong>{totMPrev}</strong></td>
                        <td><strong>{totSPrev}</strong></td>
                        <td><strong>{totProjPrev}</strong></td>
                        <td><strong>{totUPrev}</strong></td>
                        <td><strong>{totAPrev}</strong></td>
                      </tr>
                    </tbody>
 
                  </table>
                </div>             
                 */}

                <div className="col-md-12">
                  <table id="table-offices-devices" className="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th colSpan={9} style={{textAlign:"center", fontWeight: "bold"}}>{"Ocular Inspection Summary as of " + this.props.ArrangeDate(new Date(), false)}</th>
                        </tr>

                        <tr>
                          <th>UNIT/SECTION</th>
                          <th>PC</th>
                          <th>MONITOR</th>
                          <th>PRINTER</th>
                          <th>LAPTOP</th>
                          <th>UPS</th>
                          <th>AVR</th>
                          <th>SCANNER</th>
                          <th>LCD PROJECTOR</th>
                        </tr>                                              
                      </thead>
                      <tbody>
                        {
                          officesKeys.map((key, i) => {
                            return (
                              <tr>
                                <td style={{textAlign:"left"}}> { key } </td>
                                <td> { offices[key].desktop } </td>
                                <td> { offices[key].monitor } </td>
                                <td> { offices[key].printer } </td>
                                <td> { offices[key].laptop } </td>
                                <td> { offices[key].ups } </td>
                                <td> { offices[key].avr } </td>
                                <td> { offices[key].scanner } </td>
                                <td> { offices[key].projector } </td>
                              </tr>
                            )
                          })
                        }

                      </tbody>
                  </table>

                  <div id="search-svg-button">
                    <ReactToExcel
                      table={"table-offices-devices"}
                      filename={"table-offices-devices"}
                      sheet="sheet 1"
                      buttonText={<FaDownload />}
                    />
                  </div>

                </div>


              </div>
            

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard
})

export default connect(mapStateToProps, {
  GetYear,
  GetDevicesDashboardNumbers,
  ArrangeDate,
})(HomeScreen);
