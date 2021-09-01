import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Footer from './components/helpers/Footer';
import Header from './components/helpers/Header';
import SideNav from './components/helpers/SideNav';
import FloatingActionArea from './components/helpers/FloatingActionArea';
import ErrorScreen from './components/helpers/ErrorScreen';

import Dashboard from './components/Dashboard';
import Records from './components/Records';
import RecordsNew from './components/RecordsNew';
import Role from './components/Role';
import User from './components/User';
import Office from './components/Office';
import Profile from './components/User/Profile';
import FileUpload from './components/FileUpload';
import Device from './components/Device';
import AppModule from './components/AppModule';
import NedaTest from './Test';

import QRScanPreventive from './components/QRScan/Preventive';
import QRScanCorrective from './components/QRScan/Corrective';
import QRScanDevice from './components/QRScan/DeviceQR';
import QRScan from './components/QRScan';


import HfPersonnel from './components/CEIR/HfPersonnel';
import DOHCHDPersonnel from './components/CEIR/DOHCHDPersonnel';
import HfDashboard from './components/CEIR/Dashboard';
import Duplicate from './components/CEIR/Duplicate';
import AnnexA from './components/CEIR/Annex_a';
import HealthFacility from './components/CEIR/HealthFacility';
import VaccineeProfile from './components/CEIR/VaccineeProfile';
import PrePostMonitoring from './components/CEIR/PrePostMonitoring';
import VaccinationSites from './components/CEIR/VaccinationSites';
import VasReport from './components/CEIR/VasReport';

import UserComment from './components/UserComment';
import UserManual from './components/UserManual';
import JobOrderRequest from './components/JobOrderRequest';

//=================~import component~=================
import Login from './components/Login';
import Signup from './components/Signup';
import CommentLog from './components/Log';

import Alert from './components/helpers/Alert';
import Toaster from './components/helpers/Toaster';
import PasswordRequire from './components/helpers/PasswordRequire';

import Sample from './components/Sample';


import { USER_ROUTES, APP_ROUTES } from './config';

// import Customer from './components/Customer';
import { ConnectSocket, ListenLogs } from './actions/helpers/socketAction';

class App extends Component {
  constructor() {
    super();

    this.state = {
      routes: [
        {
          path: '/',
          component: Dashboard,
          layout: true,
        },
        {
          path: '/admin/records',
          component: Records,
          layout: true,
        },
        {
          path: '/admin/recordsNew',
          component: RecordsNew,
          layout: true,
        },
        {
          path: '/admin/role',
          component: Role,
          layout: true,
        },

        {
          path: '/admin/office',
          component: Office,
          layout: true,
        },

        {
          path: '/admin/user',
          component: User,
          layout: true,
        },
        {
          path: '/user/profile',
          component: Profile,
          layout: true,
          default: true,
        },

        {
          path: '/commentlog',
          component: CommentLog,
          layout: true,
        },
        // {
        //   path: '/upload',
        //   component: FileUpload,
        //   layout: true,
        // },
        {
          path: '/admin/device',
          component: Device,
          layout: true,
        },
        {
          path: '/admin/reported-issues',
          component: UserComment,
          layout: true,
        },

        {
          path: '/admin/app-module',
          component: AppModule,
          layout: true,
        },

        {
          path: '/my-reported-issues',
          component: UserComment,
          layout: true,
        },

        {
          path: '/admin/job-order-request',
          component: JobOrderRequest,
          layout: true,
        },

        {
          path: '/ceir/hf-personnel',
          component: HfPersonnel,
          layout: true,
        },

        {
          path: '/ceir/doh-chd-personnel',
          component: DOHCHDPersonnel,
          layout: true,
        },

        {
          path: '/ceir/dashboard',
          component: HfDashboard,
          layout: true,
        },

        {
          path: '/ceir/duplicates',
          component: Duplicate,
          layout: true,
        },


        {
          path: '/ceir/annex-a',
          component: AnnexA,
          layout: true,
        },

        {
          path: '/ceir/health-facility',
          component: HealthFacility,
          layout: true,
        },

        {
          path: '/ceir/vaccinees-profile',
          component: VaccineeProfile,
          layout: true,
        },

        {
          path: '/ceir/vaccination-sites',
          component: VaccinationSites,
          layout: true,
        },

        {
          path: '/ceir/pre-post-monitoring',
          component: PrePostMonitoring,
          layout: false,
        },

        {
          path: '/ceir/vas-report',
          component: VasReport,
          layout: true,
        },

        {
          path: '/qr',
          component: QRScan,
          layout: false,
        },

        {
          path: '/qr-scan-preventive',
          component: QRScanPreventive,
          layout: false,
        },

        {
          path: '/qr-scan-corrective',
          component: QRScanCorrective,
          layout: false,
        },

        {
          path: '/qr-scan-device',
          component: QRScanDevice,
          layout: false,
        },

        //=================~add component to routes~=================        
      ],
    }
  }

  render() {
    var routes = JSON.parse(localStorage.getItem(USER_ROUTES));
    
    // console.log(":::::::::::::::::::::::::+++++++++++++===");
    // console.log(window.location.pathname);
    localStorage.setItem('doh-prev-url', window.location.pathname)
    // // if (false) {

    if (localStorage.getItem('doh-jwt') == null) {
      return <BrowserRouter>
        <div className="App">
          <Route path="/login" render={(props) => <Login {...props} />} exact />
          <Route path="/signup" render={(props) => <Signup {...props} />} exact />
          {
            (window.location.pathname != "/signup")
              ? <Redirect push to='/login' component={Login} />
              : ""
          }
        </div>
      </BrowserRouter>
    }

    return (
      <BrowserRouter>

        <Switch>
 
          {/* <Route path='/user-manual' render={() => {
            return <div>
              <SideNav />
              <FloatingActionArea />
              <Header />
              <div id="page-content">
                <UserManual />
              </div>
              <Footer />
            </div>
          }} exact /> */}

          {
            routes.map((val, i) => {

              for (var j = 0; j < this.state.routes.length; j++) {

                if (val.path == this.state.routes[j].path) {

                  var Comp = this.state.routes[j].component;

                  return (
                    <Route
                      path={this.state.routes[j].path}
                      render={() => {
                        return (this.state.routes[j].layout) ? (
                          <div className="App" style={{ width: "100%" }}>
                              <Header />
                                <div className="container-fluid"  style={{ marginTop: `80px` }}>
                                  <div id="page-content">
                                    <Comp></Comp>
                                  </div>
                                </div>
                              <div className="col-md-12"><Footer /></div>
                            <FloatingActionArea />
                          </div>
                        ) : (
                          <div className="App" style={{ width: "100%" }}>
                            <Alert />
                            <div id="page-content-without-layout">
                              <Comp></Comp>
                            </div>
                          </div>
                        )
                      }}
                      exact
                    />
                  )
                }
              }

            })
          }
          
          <Route component={ErrorScreen} />
          
        </Switch>

      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
  ConnectSocket,
  ListenLogs
})(App);
