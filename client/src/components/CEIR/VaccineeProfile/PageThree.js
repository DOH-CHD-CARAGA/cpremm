import React from 'react';
import { Input, NavLink, FormGroup, Form, Label, Row, Col, Button, ButtonGroup, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { FaAngleLeft, FaAngleRight, FaPaperPlane } from "react-icons/fa";

import {
    GetList,
} from '../../../actions/helpers/displayAction';

class PageThree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <h4><b>Vaccination</b></h4> <small><i>(to be filled up at Vaccination Area/Vaccinator)</i></small>
                </div>
                <div className="col text-right">
                    <span style={{ cursor: "pointer" }} className="text-primary" onClick={() => { this.props.TogglePage(0) }}> Go back <FaAngleLeft /> </span>
                </div>

                <div className="col-lg-12 mt-3">
                    <Table responsive size="sm">
                        <thead>
                            <tr>
                                <th>Vaccine</th>
                                <th className="text-left">Manufacturer</th>
                                <th className="text-left">Lot No.</th>
                                <th className="text-left">Date</th>
                                <th className="text-left">Vaccinator</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row">
                                    1st Dose
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    2nd Dose
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <h6><b>POST VACCINATION MONITORING AREA</b></h6>
                    <Table responsive size="sm">
                        <thead>
                            <tr>
                                <th>Vital Signs</th>
                                <th className="text-left">Every 15 mins</th>
                                <th className="text-left">Every 30 mins</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row">
                                    Temperature
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    Heart Rate
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    Respiratory Rate
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    Oxygen saturation
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                            </tr>
                            <tr>
                                <td scope="row">
                                    Blood Pressure
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                                <td>
                                    <Input type="text" size="sm" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                </td>
                            </tr>

                            <tr>

                            </tr>
                        </tbody>
                    </Table>

                    <FormGroup>
                        <Label for="exampleDate"><small>Other Observation</small></Label>
                        <Input size="sm" type="textarea" name="text" id="exampleText" />
                    </FormGroup>

                </div>


                <div className="col-lg-12 mt-2 text-right">
                    <ButtonGroup className="ml-auto">
                        <Button size="sm" outline color="warning">
                            <span style={{ cursor: "pointer" }} onClick={() => { this.props.TogglePage(2) }}> Back <FaAngleLeft /> </span>
                        </Button>
                        <Button size="sm" outline color="success">
                            <span style={{ cursor: "pointer" }}> Submit <FaPaperPlane /> </span>
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
})(PageThree);

