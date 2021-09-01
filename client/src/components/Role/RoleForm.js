import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, FormGroup} from 'reactstrap';
import { FaPlus, FaTimes } from 'react-icons/fa';
import LabelInput from '../helpers/LabelInput';
import {
  ArrangeAmount,
  SetValue,
  ArrangeName,
} from '../../actions/helpers/displayAction';

import {
  GetDate,
} from '../../actions/helpers/dateAction';

import {
  SET_ROLE_VALUE,
} from '../../actions/types';

import {
  addRoute,
  removeRoute,
  addSystem,
  removeSystem,
} from '../../actions/roleAction';

class RoleForm extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      route: "",
      system: "",
    }
  }


  render () {

    var links = [
      {value: '/', text: 'Dashboard' },
      {value: '/admin/role', text: 'Roles' },
      {value: '/admin/user', text: 'Users' },
      {value: '/admin/office', text: 'Offices' },
      {value: '/commentlog', text: 'Comments/Logs' },
      {value: '/upload', text: 'Upload Data' },
      {value: '/admin/records', text: 'Records' },
      {value: '/admin/recordsNew', text: 'Records New' },
      {value: '/admin/device', text: 'Device' },
      {value: '/admin/reported-issues', text: 'User Comments' },
      {value: '/my-reported-issues', text: 'Reported Issues' },
      {value: '/admin/job-order-request', text: 'Job Order Request' },
      {value: '/admin/app-module', text: 'App Module' },
      {value: '/ceir/hf-personnel', text: 'CEIR HF Personnel' },
      {value: '/ceir/doh-chd-personnel', text: 'DOH-CHD Personnel' },
      {value: '/ceir/dashboard', text: 'CEIR Dashboard' },
      {value: '/ceir/duplicates', text: 'Personnel Duplicates' },
      {value: '/ceir/annex-a', text: 'Annex A' },
      {value: '/ceir/health-facility', text: 'Health Facility' },
      {value: '/ceir/vaccination-sites', text: 'Vaccination Sites' },
      {value: '/ceir/vaccinees-profile', text: 'Vaccinees Profile' },
      {value: '/ceir/pre-post-monitoring', text: 'Pre-Post Monitoring' },
      {value: '/ceir/vas-report', text: 'VAS Report' },
      {value: '/qr-scan-preventive', text: 'QR Scan Preventive' },
      {value: '/qr-scan-corrective', text: 'QR Scan Corrective' },
      {value: '/qr-scan-device', text: 'QR Scan Device' },
      {value: '/qr', text: 'QR Scan' },
      {value: '/sample', text: 'Sample' },
      {value: '/sample-add', text: 'Sample Add' },
      //=================~setup to role form menu -links ~=================
    ], finLink = [];

    const access = {
      '/': "Dashboard",
      '/admin/role': "Roles",
      '/admin/user': "Users",
      '/admin/office': "Offices",
      '/commentlog': "Comments/Logs",
      '/upload': "Upload Data",
      '/admin/records': "Records",
      '/admin/recordsNew': "Records New",
      '/admin/device': "Device",
      '/admin/reported-issues': "User Comments",
      '/my-reported-issues': "My Reported Issues",
      '/admin/job-order-request': "Job Order Request",
      '/admin/app-module': "App Module",
      '/ceir/hf-personnel': "CEIR HF Personnel",
      '/ceir/doh-chd-personnel': "DOH-CHD Personnel",
      '/ceir/dashboard': "CEIR Dashboard",
      '/ceir/duplicates': "Personnel Duplicates",
      '/ceir/annex-a': "Annex A",
      '/ceir/health-facility': 'Health Facility',
      '/ceir/vaccination-sites': 'Vaccination Sites',
      '/ceir/vaccinees-profile': 'Vaccinees Profile',
      '/ceir/pre-post-monitoring': 'Pre-Post Monitoring',
      '/ceir/vas-report': 'VAS Report',
      '/qr-scan-preventive': 'QR Scan Preventive',
      '/qr-scan-corrective': 'QR Scan Corrective',
      '/qr-scan-device': 'QR Scan Device',
      '/qr': 'QR Scan',
      '/sample': 'Sample',
      '/sample-add': 'Sample Add',

      //=================~setup to role form menu -access ~=================

    };

    const { role, images } = this.props.role;

    var systems = role.hasOwnProperty("systems")?[...role.systems]:[];
    var availableSystems = [{text: "CPreMM", value: "cpremm"}, {text: "VIMS-IR", value: "vims-ir"}];
    var access2          = {cpremm: "CPreMM", 'vims-ir': "VIMS-IR"};
    var finSystems       = [];
    var seen;

    links.map((link, i) => {
      finLink.push(link);

      for (var x = 0, len = role.routes.length; x < len; x++) {
        if (role.routes[x].path == link.value){
          finLink.pop();         
        }
      }

    });

    availableSystems.map((system, i) => {
      finSystems.push(system);

      for (var x = 0, len = systems.length; x < len; x++) {
        if (systems[x].path == system.value){
          finSystems.pop();         
        }
      }

    });

    finSystems.unshift({value: "", text: "-- SELECT SYSTEM --"});
    finLink.unshift({value: "", text: "-- SELECT FEATURE --"});
    
    return (
      <div id="role-form" className="entry-form">
        <div>
          <div className="custom-container">
            <div className="custom-container-title">
              Detail
            </div>
            <div className="custom-container-body">
              <FormGroup>
                <LabelInput
                  label={"Role Name: "} value={role.name} prop="name" type="text" req={1} reducer={SET_ROLE_VALUE}
                  onChange={(e) => {
                    this.props.SetValue(e, SET_ROLE_VALUE);
                  }}
                />

                <div id="routes-div">
                  <div>
                    <span>Systems</span>
                    <div>
                      <div id="add-route">
                        <div id="add-route-input">
                          <LabelInput
                            label={"Available Systems"} value={this.state.system} type="select" req={1} reducer={SET_ROLE_VALUE}
                            onChange={(e) => {
                              this.setState({
                                system: e.target.value
                              })
                            }}
                            options={finSystems}
                          />
                        </div>
                      </div>
                      <FaPlus
                        onClick={() => {
                          if (this.state.system != "") {
                            this.props.addSystem(this.state.system);
                            this.setState({
                              system: ""
                            })  
                          }
                      }}/>
                    </div>
                  </div>
                  <ListGroup>
                    {
                      systems.map((data, i) => {
                        return (
                          <ListGroupItem><span>{(i+1) + ". " + access2[data.path]}</span><FaTimes onClick={() => {
                            this.props.removeSystem(i);
                          }}/></ListGroupItem>
                        )
                      })
                    }
                  </ListGroup>      

                </div><br/>

                <div id="routes-div">
                  <div>
                    <span>Routes</span>
                    <div>
                      <div id="add-route">
                        <div id="add-route-input">
                          <LabelInput
                            label={"Features"} value={this.state.route} type="select" req={1} reducer={SET_ROLE_VALUE}
                            onChange={(e) => {
                              this.setState({
                                route: e.target.value
                              })
                            }}
                            options={finLink}
                          />
                        </div>
                      </div>
                      <FaPlus
                        onClick={() => {
                          if (this.state.route != "") {
                            this.props.addRoute(this.state.route);
                            this.setState({
                              route: ""
                            })  
                          }
                      }}/>
                    </div>
                  </div>
                  <ListGroup>
                    {
                      role.routes.map((data, i) => {
                        return (
                          <ListGroupItem><span>{(i+1) + ". " + access[data.path]}</span><FaTimes onClick={() => {
                            this.props.removeRoute(i);
                          }}/></ListGroupItem>
                        )
                      })
                    }
                  </ListGroup>      

                </div>
                
              </FormGroup>
              
            </div>
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  role: state.role,
});

export default connect(mapStateToProps, {
  ArrangeAmount,
  GetDate,
  SetValue,
  ArrangeName,
  addRoute,
  removeRoute,
  addSystem,
  removeSystem,
})(RoleForm);
