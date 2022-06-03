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
 
    var currentYear = this.props.GetYear();
    var previousYear = currentYear - 1;

    var { data, offices, numbers } = this.props.dashboard;
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
      router: [], camera: [], speaker: [], projector: [], tablet: [],

      desktopPrev: [], laptopPrev: [], printerPrev: [], monitorPrev: [],
      scannerPrev: [], projectorPrev: [], avrPrev: [], upsPrev: [], 
      routerPrev: [], cameraPrev: [], speakerPrev: [], tabletPrev: [],
    };
    var currSum = 0, prevSum = 0;


    console.log("+++++++++++++++!!!!!!!!!!!!!!!!!!_______");
    console.log(numbers);
    console.log(data);
    console.log(offices);


    return (
      <div>
        <div id="dashboard" className="justify-content-center">
          <div className="container-fluid">
            <div className="custom-cards rounded-container box-shadow-container">
            <h6 className="title-bar">{"Dashboard"}</h6>
            <hr/>
              <div className="row">
                <div className="row col-md-8 table-responsive">
                  <div style={{minWidth:'400px'}}> 
                    <Doughnut data={{
                      datasets: [{
                        data: [
                          (numbers.current.inUse.desktop + numbers.previous.inUse.desktop), 
                          (numbers.current.inUse.laptop  + numbers.previous.inUse.laptop), 
                          (numbers.current.inUse.monitor + numbers.previous.inUse.monitor), 
                          (numbers.current.inUse.printer + numbers.previous.inUse.printer), 
                          (numbers.current.inUse.ups     + numbers.previous.inUse.ups), 
                          (numbers.current.inUse.avr     + numbers.previous.inUse.avr), 
                          (numbers.current.inUse.scanner + numbers.previous.inUse.scanner), 
                          (numbers.current.inUse.projector  + numbers.previous.inUse.projector), 
                          (numbers.current.inUse.scanner  + numbers.previous.inUse.router), 
                          (numbers.current.inUse.camera  + numbers.previous.inUse.camera), 
                          (numbers.current.inUse.speaker  + numbers.previous.inUse.speaker), 
                          (numbers.current.inUse.tablet  + numbers.previous.inUse.tablet), 
                        ],
                        backgroundColor: [
                        '#1395ba',
                        '#0d3c55',
                        'blue',
                        '#c02e1d',
                        '#f16c20',
                        '#ebc844',
                        '#a2b86c',
                        '#435a08',
                        '#6c757d',
                        '#e83e8c',
                        '#6610f2',
                        '#28a745',
                        ],
                      }],
                      labels:["DESKTOP", "LAPTOP", "MONITOR", "PRINTER", "UPS", "AVR", "SCANNER","PROJECTOR","ROUTER","CAMERA","SPEAKER","TABLET"],
                      text: '23%'            
                    }} />
                  </div>
                </div>

                <div className="row col-md-4">
                  <div className="col-md-12 custom-container">
                    <div className="custom-container-title">
                      CURRENT YEAR TOTAL
                    </div>
                    <div className="custom-container-body">
                      <h1 className="report-number">{numbers.current.inUse.total}</h1>
                    </div>
                  </div>

                  <div className="col-md-12 custom-container">
                    <div className="custom-container-title">
                      PREVIOUS YEARS TOTAL
                    </div>
                    <div className="custom-container-body">
                      <h1 className="report-number">{numbers.previous.inUse.total}</h1>
                    </div>
                  </div>

                </div>
              </div><br/><br/>

              <div className="row">
                <div className="col-md-8 table-responsive">
                  <div style={{minWidth:'400px'}}>
                    <Bar data = {
                      {
                        labels: ['DESKTOP', 'LAPTOP', 'MONITOR', 'PRINTER', 'UPS', 'AVR', 'SCANNER',"PROJECTOR","ROUTER","CAMERA","SPEAKER","TABLET"],
                        datasets: [
                          {
                            label: 'In-Use',
                            data: [
                              numbers.current.inUse.desktop + numbers.previous.inUse.desktop,
                              numbers.current.inUse.laptop  + numbers.previous.inUse.laptop,
                              numbers.current.inUse.monitor + numbers.previous.inUse.monitor,
                              numbers.current.inUse.printer + numbers.previous.inUse.printer,
                              numbers.current.inUse.ups     + numbers.previous.inUse.ups,
                              numbers.current.inUse.avr     + numbers.previous.inUse.avr,
                              numbers.current.inUse.scanner + numbers.previous.inUse.scanner,
                              numbers.current.inUse.projector+ numbers.previous.inUse.projector, 
                              numbers.current.inUse.router  + numbers.previous.inUse.router, 
                              numbers.current.inUse.camera  + numbers.previous.inUse.camera, 
                              numbers.current.inUse.speaker + numbers.previous.inUse.speaker, 
                              numbers.current.inUse.tablet  + numbers.previous.inUse.tablet, 
                            ],
                            backgroundColor: '#1a8d5f',
                          },
                          {
                            label: 'Waste',
                            data: [
                              numbers.current.waste.desktop + numbers.previous.waste.desktop,
                              numbers.current.waste.laptop  + numbers.previous.waste.laptop,
                              numbers.current.waste.monitor + numbers.previous.waste.monitor,
                              numbers.current.waste.printer + numbers.previous.waste.printer,
                              numbers.current.waste.ups     + numbers.previous.waste.ups,
                              numbers.current.waste.avr     + numbers.previous.waste.avr,
                              numbers.current.waste.scanner + numbers.previous.waste.scanner,
                              numbers.current.waste.projector  + numbers.previous.waste.projector, 
                              numbers.current.waste.router  + numbers.previous.waste.router, 
                              numbers.current.waste.camera  + numbers.previous.waste.camera, 
                              numbers.current.waste.speaker  + numbers.previous.waste.speaker, 
                              numbers.current.waste.tablet  + numbers.previous.waste.tablet, 
                            ],
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
                </div>              
              
                <div className="row col-md-4">
                  <div className="col-md-12 custom-container">
                    <div className="custom-container-title">
                      TOTAL IN USE
                    </div>
                    <div className="custom-container-body">
                      <h1 className="report-number">{numbers.current.inUse.total + numbers.previous.inUse.total}</h1>
                    </div>
                  </div>

                  <div className="col-md-12 custom-container">
                    <div className="custom-container-title">
                      TOTAL WASTES
                    </div>
                    <div className="custom-container-body">
                      <h1 className="report-number">{numbers.current.waste.total + numbers.previous.waste.total}</h1>
                    </div>
                  </div>

                </div>              
              </div>
{/* 
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
              </div> */}

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

                <div className="col-md-12 table-responsive">
                  <table id="table-offices-devices" className="table table-hover table-striped" style={{width:"100%"}}>
                      <thead>
                        <tr>
                          <th colSpan={13} style={{textAlign:"center", fontWeight: "bold"}}>{"Ocular Inspection Summary as of " + this.props.ArrangeDate(new Date(), false)}</th>
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
                          <th>ROUTER</th>
                          <th>CAMERA</th>
                          <th>SPEAKER</th>
                          <th>TABLET</th>
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
                                <td> { offices[key].router } </td>
                                <td> { offices[key].camera } </td>
                                <td> { offices[key].speaker } </td>
                                <td> { offices[key].tablet } </td>
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
