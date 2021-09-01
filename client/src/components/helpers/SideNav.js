import React, { Component, Fragment } from 'react';
import { Collapse } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
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

class SideNav extends Component {

  constructor (props) {
    super(props);
    this.state = {
      current: window.location.pathname,
      links: APP_ROUTES,
      routes: JSON.parse(localStorage.getItem(USER_ROUTES)),
      role: JSON.parse(localStorage.getItem(USER_ROLE)),
      appRoutes: [],
    }

    this.arrangeRoutes = this.arrangeRoutes.bind(this);
    this.checkCurrentPageDuringRefresh = this.checkCurrentPageDuringRefresh.bind(this);
    this.toggleRoute = this.toggleRoute.bind(this);
    this.refreshMenusActiveSubmenu = this.refreshMenusActiveSubmenu.bind(this);
    this.refreshMenusToggle = this.refreshMenusToggle.bind(this);
    this.activateMenu = this.activateMenu.bind(this);
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

    console.log("--------------.....................");
    console.log(this.state.role.systems.length);

    var logos = {
      "vims-ir": VIMSLogo,
      "cpremm": DOHLogo,
    };

    var logo = this.state.role.systems.length;
    logo = (logo == 1)
            ? logos[this.state.role.systems[0].path]
            : KMICTLogo

    return (
      <div id="sidenav" className="sidenav box-shadow-container">
        <div className="logo-div">
          <img 
            src={logo} height="30" className="d-inline-block align-top clickable" alt=""
            onClick={() => {
              // console.log(this);
              this.props.history.push(this.state.routes[0].path);
            }}
          />
        </div>

        <div className="navlinks">
        {
          this.state.appRoutes.map((appRoute, i) => {
            return (
              <Fragment>
                <div className={"row navs" + ((appRoute.active)?" active":"") + ((appRoute.hasOwnProperty("sub"))?(" withSubmenu" + ((appRoute.isOpen)?" submenu-open":" submenu-close")):"")}>

                  <div className="col-md-10">
                    <NavLink to={appRoute.path} isActive={oddEvent} 
                      onClick={async () => { 
                        await this.toggleRoute(appRoute.path);
                        await this.refreshMenusActiveSubmenu();
                        await this.activateMenu(i);
                        this.refreshMenusToggle(i);
                      }} 
                      className={"btn button-primary"} on={"true"}>
                      {appRoute.text}
                    </NavLink>
                  </div>

                  <div className="col-md-2">
                    {
                      (appRoute.hasOwnProperty("sub"))
                        ?<Fragment>
                            {
                              (appRoute.isOpen)
                                ?<FaChevronUp className="submenu-show-button" onClick={() => {
                                    this.refreshMenusToggle(i);
                                  }}/>
                                :<FaChevronDown className="submenu-show-button" onClick={() => {
                                  this.refreshMenusToggle(i);
                                }}/>
                            }                        
                        </Fragment>
                        :""
                    }
                  </div>
                </div>
                
                {
                  (appRoute.hasOwnProperty("sub"))
                    ?<Collapse isOpen={appRoute.isOpen}>
                      {
                        appRoute.sub.map((sublink) => {
                            return(
                              <NavLink to={sublink.path} isActive={oddEvent} 
                                onClick={() => { 
                                  this.toggleRoute(sublink.path);
                                  this.refreshMenusActiveSubmenu(i, true);
                                }} 
                                className={"submenu btn button-primary" + ((this.state.current == sublink.path)?" active":"")} on={"true"}>&nbsp;&nbsp;&nbsp;{sublink.text}
                              </NavLink>
                            )
                        })
                      }
                    </Collapse>
                    :""
                }

              </Fragment>
            )
          })
        }
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
})

export default withRouter(connect(mapStateToProps, {
})(SideNav));
