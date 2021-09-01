import React, { Component, Fragment  } from 'react';
import { NavLink , withRouter } from 'react-router-dom';
import { Collapse ,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { FaChevronDown, FaChevronUp ,FaUserCog } from 'react-icons/fa';
import {
  ArrangeName,
  GetList,
} from '../../actions/helpers/displayAction.js';
import {
  togglePasswordRequire,
} from '../../actions/helpers/confirmAction.js';
import Alert from './Alert';
import Toaster from './Toaster';
import PasswordRequire from './PasswordRequire';

import { USER_ROUTES, APP_ROUTES, USER_ROLE } from '../../config';
import DOHLogo from '../../images/DOHLogo4.png';
import KMICTLogo from '../../images/kmict.png';
import VIMSLogo from '../../images/VIMS-LOGO.png';

const oddEvent = (match, location) => {
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownAccount: false,
      passwordRequireModal: false,
      current: window.location.pathname,
      links: APP_ROUTES,
      routes: JSON.parse(localStorage.getItem(USER_ROUTES)),
      role: JSON.parse(localStorage.getItem(USER_ROLE)),
      appRoutes: [],
    };

    this.toggleAccount = this.toggleAccount.bind(this);
    // this.togglePasswordRequire = this.togglePasswordRequire.bind(this);
    this.arrangeRoutes = this.arrangeRoutes.bind(this);
    this.checkCurrentPageDuringRefresh = this.checkCurrentPageDuringRefresh.bind(this);
    this.toggleRoute = this.toggleRoute.bind(this);
    this.refreshMenusActiveSubmenu = this.refreshMenusActiveSubmenu.bind(this);
    this.refreshMenusToggle = this.refreshMenusToggle.bind(this);
    this.activateMenu = this.activateMenu.bind(this);
  }

  // togglePasswordRequire () {
  //   this.setState({
  //     passwordRequireModal: !this.state.passwordRequireModal
  //   })
  // }

  toggleAccount() {
    this.setState(prevState => ({
      dropdownAccount: !prevState.dropdownAccount
    }));
  }

  async componentWillMount () {
    await this.arrangeRoutes();
    this.checkCurrentPageDuringRefresh();
  }

  arrangeRoutes () {
    var appRoutesTemp = [];

    this.state.links.map((link, i) => {
      if (!link.hasOwnProperty('sub')) {

        for (let x = 0; x < this.state.routes.length; x++) {
          if (this.state.routes[x].path == link.path) {
            appRoutesTemp.push({...link});
            break;
          }
        }

      }else {
        var linkTemp = {
          ...link,
          sub: [],
        };
        link.sub.map((submenu, j) => {
          for (let x = 0; x < this.state.routes.length; x++) {
            if (this.state.routes[x].path == submenu.path) {
              linkTemp.sub.push({...submenu});
              break;
            }
          }  
        });

        if (linkTemp.sub.length > 0) {
          appRoutesTemp.push({...linkTemp});
        }

      }
    });

    this.setState({
      appRoutes: [...appRoutesTemp]
    })
  }

  checkCurrentPageDuringRefresh () {
    var appRoutes = [...this.state.appRoutes];
    var subs = [];
    for (let x = 0; x < appRoutes.length; x++) {

      if ((this.state.current == appRoutes[x].path)) {
        appRoutes[x] = {
          ...appRoutes[x],
          active: true,
          isOpen: true,
        };
        break;
      }

      if (appRoutes[x].hasOwnProperty("sub")) {
        subs = [...appRoutes[x].sub];

        for (let y = 0; y < subs.length; y++) {
          if (this.state.current == subs[y].path){
            subs[y] = {
              ...subs[y],
              active: true,
            }

            appRoutes[x] = {
              ...appRoutes[x],
              sub: [...subs],
              active: true,
              hasActiveSubmenu: true
            };        
          }
        }

      }
    }

    this.setState({
      appRoutes: [...appRoutes]
    })    
  }

  toggleRoute (val) {
    this.setState({
      current: val,
    })
  }

  refreshMenusActiveSubmenu (ind, submenu = false){
    var appRoutes = [...this.state.appRoutes];
    for (let z = 0; z < appRoutes.length; z++) {
      if (appRoutes[z].hasOwnProperty("hasActiveSubmenu")) {
        appRoutes[z] = {
          ...appRoutes[z],
          hasActiveSubmenu: false,
          active: false,
        };  
      }else {
        appRoutes[z] = {
          ...appRoutes[z],
          active: false,
        };  
      }
    }

    if (submenu) {
      appRoutes[ind] = {
        ...appRoutes[ind],
        hasActiveSubmenu: true,
        active: true,
      };  
    }


    this.setState({
      appRoutes: [...appRoutes]
    })
  }

  refreshMenusToggle (ind){
    var appRoutes = [...this.state.appRoutes];

    appRoutes[ind] = {
      ...appRoutes[ind],
      isOpen: !appRoutes[ind].isOpen,
    }

    this.setState({
      appRoutes: [...appRoutes]
    })
  }

  activateMenu (ind) {
    var appRoutes = [...this.state.appRoutes];

    for (let z = 0; z < appRoutes.length; z++) {
      appRoutes[z] = {
        ...appRoutes[z],
        active: false,
      };
    }

    appRoutes[ind] = {
      ...appRoutes[ind],
      active: true
    }

    this.setState({
      appRoutes: [...appRoutes]
    })
  }

  render() {
    var name = this.props.ArrangeName(JSON.parse(localStorage.getItem("doh-user-name")));
    var designation = localStorage.getItem("doh-user-designation");

    var isAdmin = false;

    console.log("--------------.....................");
    console.log(this.state.role.systems.length);

    var logos = {
      "vims-ir": VIMSLogo,
      "cpremm": DOHLogo,
    };

    var logo = this.state.role.systems.length;
    logo = (logo == 1)
            ? logos[this.state.role.systems[0].path]
            : DOHLogo
    
    return (
      <div>
        <Alert />
        <Toaster />
        <PasswordRequire modal={this.props.confirm.show} toggle={() => { this.props.togglePasswordRequire() }} />
        {/* <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light"> */}
        {/* <nav class="navbar fixed-top navbar-expand-lg" style={{backgroundColor:'#1a8d5f',}}> */}
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light" style={{Color:'black',}}>
          <div className="navbar-brand logo-div">
            <img
              src={logo} height="30" className="d-inline-block align-top clickable" alt=""
              onClick={() => {
                // console.log(this);
                // this.props.history.push(this.state.routes[0].path);
              }}
            />
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" style={{Color:'black'}}>
              {/* <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li> */}
              {
                this.state.appRoutes.map((appRoute, i) => { 
                  return (
                    <Dropdown>
                      <DropdownToggle>
                      </DropdownToggle>
                      <DropdownMenu right>
                        {/* <DropdownItem header>Settings</DropdownItem> */}
                        <DropdownItem>
                          <NavLink to="/user/profile">My Profile</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink to="/my-reported-issues">Reported Issues</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          <NavLink to="/user-manual">User Manual</NavLink>
                        </DropdownItem>

                        <DropdownItem divider/>
                      </DropdownMenu>
                    </Dropdown>
                  )
                })
              }
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li> */}
              <form className="form-inline my-2 my-lg-0" style={{textAlign:"right"}}>
                <div className="custom-navbar-info">
                  <span className="custom-navbar-info-main">{ name }</span>
                  <br/>
                  <small>{ designation }</small>
                            
                </div>
                <Dropdown isOpen={this.state.dropdownAccount} toggle={this.toggleAccount}>
                  <DropdownToggle>
                  {/* <div style={{
                    borderRadius: 100,
                    backgroundColor: '#e0d511',
                    height: 35,
                    width: 35
                  }}>
                  </div> */}
                  <FaUserCog  style={{fontSize:"22px"}}/>

                  </DropdownToggle>
                  <DropdownMenu right>
                    {/* <DropdownItem header>Settings</DropdownItem> */}
                    <DropdownItem>
                      <NavLink to="/user/profile">My Profile</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink to="/my-reported-issues">Reported Issues</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink to="/user-manual">User Manual</NavLink>
                    </DropdownItem>

                    <DropdownItem divider/>
                    <DropdownItem onClick={() => {
                      localStorage.removeItem('doh-jwt');
                      localStorage.removeItem('doh-user-name');
                      localStorage.removeItem('doh-user-role');
                      localStorage.removeItem('doh-user-designation');
                      localStorage.removeItem('doh-user-status');
                      localStorage.removeItem('doh-user-off');
                      localStorage.removeItem('doh-user-routes');

                      // this.props.history.push('/login');
                      window.location.reload();
                    }}>Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </form>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  confirm: state.confirm,
})

export default connect(mapStateToProps, {
  ArrangeName,
  togglePasswordRequire,
  GetList,
})(Header);