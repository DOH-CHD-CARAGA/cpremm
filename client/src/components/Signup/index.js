import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { Button, Col, Input, CustomInput } from 'reactstrap';

import {
  GetList,
  ArrangeName,
} from '../../actions/helpers/displayAction';

import {
  SET_OFFICES
} from './../../actions/types';

import LabelInput from '../helpers/LabelInput';
import InfoModal from '../helpers/InfoModal';

import {
  ToggleAlert,
} from '../../actions/helpers/alertAction';
import {
  CheckSimilarAccount,
} from '../../actions/userAction';



import Alert from '../helpers/Alert';


class Signup extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      info: {
        _id: "",
        name: {
          first: "",
          last: "",
          mid: ""
        },
  
        office: {
          _id: "",
          section: "",
          division: ""
        },
        
        username: "",
        password: "",
        passwordVerif: ""
      },

      form: 1,

      offices: [],
      divisions: [],
      sections: [],

      matchedUsers: [],

      nameModal: false,

    }

    this.ChangeForm = this.ChangeForm.bind(this);
    this.NameIsComplete = this.NameIsComplete.bind(this);
    this.OfficeIsComplete = this.OfficeIsComplete.bind(this);
    this.ChangeName = this.ChangeName.bind(this);
    this.SetDivisions = this.SetDivisions.bind(this);
    this.SetOffices = this.SetOffices.bind(this);
    this.NameModalToggle = this.NameModalToggle.bind(this);

    props.GetList("office/get", SET_OFFICES, 1, 100000, undefined, {"division": 1});

  }

  NameModalToggle () {
    this.setState({
      ...this.state,
      nameModal: !this.state.nameModal
    })
  }

  ChangeForm (num) {
    this.setState({
      ...this.state,
      form: num
    })
  }

  NameIsComplete () {
    return (this.state.info.name.first != "" && this.state.info.name.last != "")?true:false;
  }

  OfficeIsComplete () {
    return (this.state.info.office._id != "")?true:false;
  }

  ChangeName(field, val) {
    this.setState({
      info: {
        ...this.state.info,
        name: {
          ...this.state.info.name,
          [field]: val
        }
      }
    })
  }

  SetDivisions () {

    var { offices } = this.props.office;
    var divisions = [];


    for (let x = 0; x < offices.length; x++) {
      if (!divisions.includes(offices[x].division)) {
        divisions.push(offices[x].division);
      }
    }


    var divisionsTemp = [];

    for (let x = 0; x < divisions.length; x++) {
      divisionsTemp.push({
        value: divisions[x],
        text: divisions[x],
      });
    }


    // this.setState({
    //   ...this.state,
    //   divisions: [...divisionsTemp]
    // })

  }

  SetOffices () {
    var { offices } = this.props.office;
    var officesTemp = [];


    for (let x = 0; x < offices.length; x++) {
      officesTemp.push({value: offices[x]._id, text: offices[x].division + " - " + offices[x].section});
    }


    this.setState({
      ...this.state,
      offices: [...officesTemp],
    })

  }


  render () {
    var { offices } = this.props.office;
    var stateOffice = [...this.state.offices];
    
    if (stateOffice.length == 0 && offices.length != 0) {
      this.SetOffices();
    }
    console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;------------");
    console.log(this.state);

    return (

      <div id="signup" className="row justify-content-center">
        <Alert/>

        {/* ======================= LIST sa mga ni MATCH NA NAME  */}
        <InfoModal
          id="signup-matched-names-modal"
          size = {"50%"}
          modal = {this.state.nameModal}
          toggle = {this.NameModalToggle}
          title = {"Matched Name/s"}
          fade={true}
          form = {
            <Fragment>
              <div id="modal-message">
                <em>Just press/click the matched name</em>
              </div>
              {
                this.state.matchedUsers.map((user, i) => {
                  console.log(user);
                  return (
                    <div className="row" onClick={async () => {
                      console.log({
                        ...this.state.info,
                        _id: user._id,
                        userName: user.userName,
                        name: {...user.name},
                        office: {...user.office},
                      });
                      await this.setState({
                        ...this.state,
                        info: {
                            ...this.state.info,
                            _id: user._id,
                            userName: user.username,
                            name: {
                              ...user.name
                            },
                            office: {
                              ...user.office
                            },
                        }
                      });
                      await this.NameModalToggle();

                      var timeout2 = setTimeout(() => {
                          this.setState({
                            ...this.state,
                            form: 2
                          })
                          clearTimeout(timeout2);
                      }, 500);
           
                    }}>
                      <div className="col-md-12">
                        {this.props.ArrangeName(user.name)}
                      </div>
                    </div>
    
                  )
                })
              }

            </Fragment>
          }
          buttons = {[]}
        />

        <div className="col-md-12">
          <div className="custom-cards-container">
            <div className="custom-cards rounded-container box-shadow-container">
              <h4>Create your Account</h4>        
              
              <div className="circles-row">
                <div className={"circle-1 " + ((this.state.form == 1 || this.state.form == 2 || this.state.form == 3)?"active":"")}
                  onClick={() => {
                    this.ChangeForm(1);
                  }}
                >
                  1
                </div>
                <div className={"circle-2 " + ((this.state.form == 2 || this.state.form == 3)?"active":"")}
                  onClick={() => {
                    if (this.NameIsComplete()) {
                      this.props.ToggleAlert("loading", "Checking Similar Account...", true);
                      this.ChangeForm(2);
                    }
                  }}
                >
                  2
                </div>
                <div className={"circle-3 " + ((this.state.form == 3)?"active":"")}
                  onClick={() => {
                    if (this.NameIsComplete() && this.OfficeIsComplete()) {
                      this.ChangeForm(3);
                    }
                  }}
                >
                  3
                </div>
              </div>
              <br/>

              {/* ================== FORM 1 ================== */}
              {
                (this.state.form == 1)
                  ?<div id="form1" className="row">
                    <div className="col-md-12">
                      <div className="input-grp">
                        <LabelInput
                            label={"First Name"} value={this.state.info.name.first} type="text" req={1}
                            onChange={(e) => {
                              this.ChangeName("first", e.target.value)
                            }}
                        />
                      </div>
                    </div>       
    
                    <div className="col-md-12">
                      <div className="input-grp">
                        <LabelInput
                            label={"Middle Name"} value={this.state.info.name.mid} type="text"
                            onChange={(e) => {
                              this.ChangeName("mid", e.target.value)
                            }}
                        />
                      </div>
                    </div>       
    
                    <div className="col-md-12">
                      <div className="input-grp">
                        <LabelInput
                            label={"Last Name"} value={this.state.info.name.last} type="text" req={1}
                            onChange={(e) => {
                              this.ChangeName("last", e.target.value)
                            }}
                        />
                      </div>
                    </div>       
    
                    
                    <div className="button-area">
                      <Col sm={{ size: 3 }}>
                        <Button size="md" className="" color="primary" disabled={!this.NameIsComplete()} onClick={async () => {
                          this.props.ToggleAlert("loading", "Checking Similar Account...", true);
                          var res = await this.props.CheckSimilarAccount({...this.state.info.name});
                          console.log(res);

                          var timeout = setTimeout(() => {
                            if (res.status) {
                              if (res.data.users.length > 0) {
                                console.log(res.data.users);
                                this.props.ToggleAlert("", "", false);
                                
                                var temp = [];

                                for (let x = 0; x < res.data.users.length; x++) {
                                  temp.push({
                                    ...res.data.users[x],
                                    selected: false
                                  });
                                }
                                console.log(temp);
                                this.setState({
                                  ...this.state,
                                  matchedUsers: [...temp]
                                })

                                this.NameModalToggle();
                              }else {
                                this.props.ToggleAlert("", "", false);
                                this.ChangeForm(2)
                              }
                            }

                            clearTimeout(timeout);
                          }, 500);

                        }}>Next</Button>
                      </Col>
                    </div>
    
                  </div>  
                  :""
                }

              {/* ================== FORM 2 ================== */}
              {
                (this.state.form == 2)
                  ?<div id="form2" className="row">
                    <div className="col-md-12">
                      <div className="input-grp">
                        <LabelInput
                            label={"Office"} value={this.state.info.office._id} type="select" options={[...stateOffice]}
                            onChange={(e) => {
                              this.setState({
                                ...this.state,
                                info: {
                                  ...this.state.info,
                                  office: {
                                    ...this.state.info.office,
                                    id: e.target.value
                                  }
                                }
                              })
                            }}
                        />
                      </div>
                    </div>      
    
                    <div className="button-area">
                      <Col sm={{ size: 3 }}>
                        <Button size="md" className="" color="primary" onClick={() => {}}
                          onClick={() => {
                            this.ChangeForm(1)
                          }}
                        >
                          Back
                        </Button>
                      </Col>
                      <Col sm={{ size: 3 }}>
                        <Button size="md" className="" color="primary" onClick={() => {}}
                          onClick={() => {
                            this.ChangeForm(3)
                          }}
                        >
                          Next
                        </Button>
                      </Col>
                    </div>
    
                  </div>  
  
                  :""
              }
                            
            </div>
          </div>
        </div>

      </div>
    );
  }

}



const mapStateToProps = (state) => ({
  office: state.office
})

export default connect(mapStateToProps, {
  GetList,
  ArrangeName,
  ToggleAlert,
  CheckSimilarAccount,
})(Signup);
