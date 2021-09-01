import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

import Alert from './Alert';
import Toaster from './Toaster';

class Navbar extends React.Component {

  constructor () {
    super();

    this.state = {
      nav: [
        {
          role: 1, // GM
          links: [
            {path: '/',text: 'Dashboard'},
            {path: '/members',text: 'Members'},
            {path: '/new-member',text: 'Pay In'},
            {path: '/payout',text: 'Pay Out'},
            {path: '/transactions',text: 'Transactions'},
            {path: '/branch',text: 'Branches'},
            {path: '/programs',text: 'Programs'},
            {path: '/admin/employees',text: 'Admin Settings'},
          ]
        },

        {
          role: 2, // Admin 2
          links: [
            {path: '/',text: 'Dashboard'},
            {path: '/members',text: 'Members'},
            {path: '/new-member',text: 'Pay In'},
            {path: '/payout',text: 'Pay Out'},
            {path: '/transactions',text: 'Transactions'},
            {path: '/branch',text: 'Branches'},
            {path: '/programs',text: 'Programs'},
            {path: '/admin/employees',text: 'Admin Settings'},
          ]
        },

        {
          role: 3, // Admin 1
          links: [
            {path: '/',text: 'Dashboard'},
            {path: '/members',text: 'Members'},
            {path: '/new-member',text: 'Pay In'},
            {path: '/payout',text: 'Pay Out'},
            {path: '/transactions',text: 'Transactions'},
            {path: '/branch',text: 'Branches'},
            {path: '/programs',text: 'Programs'},
            {path: '/admin/employees',text: 'Admin Settings'},
          ]
        },

        {
          role: 4, // Branch Admin
          links: [
            {path: '/',text: 'Dashboard'},
            {path: '/members',text: 'Members'},
            {path: '/new-member',text: 'Pay In'},
            {path: '/payout',text: 'Pay Out'},
            {path: '/transactions',text: 'Transactions'},
            {path: '/programs',text: 'Programs'},
          ]
        },

        {
          role: 2, // Branch Admin
          links: [
            {path: '/',text: 'Dashboard'},
            {path: '/members',text: 'Members'},
            {path: '/new-member',text: 'Pay In'},
            {path: '/payout',text: 'Pay Out'},
            {path: '/transactions',text: 'Transactions'},
            {path: '/programs',text: 'Programs'},
          ]
        },

      ]
    }
  }

  componentWillMount () {

  }

  render () {

    var links = [];
    var jwt = Cookies.get('dzjwt');
    var role = Cookies.get('dzrole');

    if (role == 1) {
      links = this.state.nav[0].links
    }else if (role == 2) {
      links = this.state.nav[0].links
    }else if (role == 3) {
      links = this.state.nav[0].links
    }else if (role == 4) {
      links = this.state.nav[3].links
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light box-shadow-container" style={{backgroundColor: '#ffffff',height: 70,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25}}>

          <Alert />
          <Toaster />

            <NavLink className="navbar-brand" to="/">Dreamzion</NavLink>
            <ul className="navbar-nav mr-auto" style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>

              {
                links.map((val, i) => {
                  return  <li key={i} className="nav-item">
                            <NavLink className="nav-link" to={val.path}>{val.text}</NavLink>
                          </li>
                })

              }




            </ul>
        </nav>
    );
  }

}

export default Navbar;
