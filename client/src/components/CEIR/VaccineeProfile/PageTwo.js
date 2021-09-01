import React from 'react';
import { Input, NavLink, FormGroup, Form, Label, Row, Col, Button, ButtonGroup, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import {
    GetList,
} from '../../../actions/helpers/displayAction';

class PageTwo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <h4><b>Assess the Patient</b></h4>
                </div>
                <div className="col text-right">
                    <span style={{ cursor: "pointer" }} className="text-primary" onClick={() => { this.props.TogglePage(0) }}> Go back <FaAngleLeft /> </span>
                </div>

                <div className="col-lg-12 mt-3">
                    <Table responsive size="sm">
                        <thead>
                            <tr>
                                <th>Questions</th>
                                <th className="text-left">Yes</th>
                                <th className="text-left">No</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row">Aged 18-59 years old?</td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">Has a history of bleeding disorders or currently taking anti-coagulants?</td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    <small>Does not manifest any of the following symptoms:</small> <br />

                                    <div className="row">
                                        <div className="col">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Fever/chills</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Headache</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Cough</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Colds</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Sore throat</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Myalgia</small></Label>
                                            </FormGroup>
                                        </div>

                                        <div className="col">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Fatigue</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Weakness</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Loss of smell/taste</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Diarrhea</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Shortness of breath/diﬃculty in breathing</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Rashes</small></Label>
                                            </FormGroup>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">Has a history of exposure to a conﬁrmed or suspected COVID-19 case in the past 2 weeks?</td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">Has been previously treated for COVID-19 in the past 90 days?</td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">Has received any vaccine in the past 28 days and does not plan to receive another vaccine 28 days following vaccination?</td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">Has received convalescent plasma or monoclonal antibodies for COVID-19 in the past 90 days?</td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">Is Pregnant? <br />
                                    <FormGroup check inline>
                                        <Input id="InputType- inlinebox" type="checkbox" />
                                        <Label for="InputType-checkbox" check> <small>2nd Trimester?</small> </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                        <Label for="InputType-checkbox" check> <small>3nd Trimester?</small> </Label>
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">Does not have any of the following diseases or health condition?
                                
                                <div className="row">
                                        <div className="col">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>HIV</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Cancer/ Malignancy</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Underwent Transplant</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Under Steroid Medication/ Treatment</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Bed ridden, terminal illness, less than 6 months prognosis</small></Label>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Autoimmune disease</small></Label>
                                            </FormGroup>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">If with the abovementioned condition, has presented medical clearance prior to vaccination day?</td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3">
                                    <h6 className="mt-2"> <b>Findings (Please Check)</b> </h6>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">Qualified for Vaccination</td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    Not-Qualified for Vaccination <br />

                                    <div className="row mt-2">
                                        <div className="col">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Temporary Deferral: </small></Label>

                                                    <FormGroup>
                                                        <Label for="exampleDate"><small>Reschedule Date of Vaccination:</small></Label>
                                                        <Input size="sm" style={{ width: '30%' }} type="date" name="date" id="exampleDate" placeholder="date placeholder"/>
                                                    </FormGroup>
                                            </FormGroup>
                                        </div>
                                        <div className="col-lg-4">
                                            <FormGroup check>
                                                <Input id="InputType-checkbox" type="checkbox" />
                                                <Label for="InputType-checkbox" check><small>Permanent Deferral: </small></Label>

                                                    <FormGroup>
                                                        <Label for="exampleDate"><small>Remarks:</small></Label>
                                                        <Input size="sm" type="textarea" name="text" id="exampleText" />
                                                    </FormGroup>
                                            </FormGroup>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                                <td className="text-left">
                                    <FormGroup check>
                                        <Input id="InputType-checkbox" type="checkbox" />
                                    </FormGroup>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>


                <div className="col-lg-12 mt-2 text-right">
                    <ButtonGroup className="ml-auto">
                        <Button size="sm" outline color="warning">
                            <span style={{ cursor: "pointer" }} onClick={() => { this.props.TogglePage(1) }}> Back <FaAngleLeft /> </span>
                        </Button>
                        <Button size="sm" outline color="primary">
                            <span style={{ cursor: "pointer" }} onClick={() => { this.props.TogglePage(3) }}> Next <FaAngleRight /> </span>
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
    GetList,
})(PageTwo);

