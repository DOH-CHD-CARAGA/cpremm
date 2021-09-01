import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Label, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { FaUserCog } from 'react-icons/fa';
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


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownAccount: false,
      passwordRequireModal: false,
    };

    this.toggleAccount  = this.toggleAccount.bind(this);
    // this.togglePasswordRequire = this.togglePasswordRequire.bind(this);

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

  componentWillMount (){
  }

  render() {
    var name        = this.props.ArrangeName(JSON.parse(localStorage.getItem("doh-user-name")));
    var designation = localStorage.getItem("doh-user-designation");

    var isAdmin = false;

    return (
      <div>
        <Alert />
        <Toaster />
        <PasswordRequire modal={this.props.confirm.show} toggle={() => { this.props.togglePasswordRequire() }}/>

        <div id="header" className="header">
          <div className="sys-title custom-navbar box-shadow-container">
            <FormGroup>
              <Input
                type="search"
                name="search"
                id="generalSearch"
                placeholder="&#xf002; Search"
              />
            </FormGroup>
          </div>
          
          <div className="custom-navbar box-shadow-container">

            <div className="custom-navbar-info">
              <span className="custom-navbar-info-main">{ name }</span>
              
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
          </div>
        </div>
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
