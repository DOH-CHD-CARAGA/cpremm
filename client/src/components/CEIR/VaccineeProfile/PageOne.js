import React from 'react';
import { Input, NavLink, FormGroup, Form, Label, Row, Col, Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import {
    GetList,
} from '../../../actions/helpers/displayAction';

class PageOne extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <h4><b>Vaccinee's Profile</b></h4>
                </div>
                <div className="col text-right">
                    <span style={{ cursor: "pointer" }} className="text-primary" onClick={() => { this.props.TogglePage(0) }}> Go back <FaAngleLeft /> </span>
                </div>

                <div className="col-lg-12 mt-2">
                    <h6>A. PERSONAL INFORMATION</h6>
                    <Row form>
                        <Col lg={6}>
                            <FormGroup>
                                <small>Name (Lastname, Firstname, Middle, Suffix)</small>
                                <Input size="sm" type="text" name="text" id="exampletext" disabled />
                            </FormGroup>
                        </Col>
                        <Col lg={2}>
                            <FormGroup>
                                <small>Sex</small>
                                <Input size="sm" type="text" disabled />
                            </FormGroup>
                        </Col>
                        <Col lg={2}>
                            <FormGroup>
                                <small>Birthdate</small>
                                <Input size="sm" type="text" disabled />
                            </FormGroup>
                        </Col>
                        <Col lg={2}>
                            <FormGroup>
                                <small>Age</small>
                                <Input size="sm" type="text" disabled />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col lg={8}>
                            <FormGroup>
                                <small>Address</small>
                                <Input size="sm" type="text" disabled />
                            </FormGroup>
                        </Col>
                        <Col lg={2}>
                            <FormGroup>
                                <small>Contact</small>
                                <Input size="sm" type="text" disabled />
                            </FormGroup>
                        </Col>
                        <Col lg={2}>
                            <FormGroup>
                                <small>Civil Status</small>
                                <Input size="sm" type="text" disabled />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row form>
                        <Col lg={4}>
                            <FormGroup>
                                <small>Profession</small>
                                <Input size="sm" type="text" disabled />
                            </FormGroup>
                        </Col>
                        <Col lg={8}>
                            <FormGroup>
                                <small>Employer (Name & Address)</small>
                                <Input size="sm" type="text" disabled />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>

                <div className="col-lg-12 mt-2">
                    <h6>B. PHYSICAL/MEDICAL EXAMINATION</h6>
                    <small><b>Vital Signs</b></small>
                    <Row form>
                        <Col lg={2}>
                            <FormGroup>
                                <small>Heart Rate</small>
                                <Input size="sm" type="text" />
                            </FormGroup>
                        </Col>
                        <Col lg={2}>
                            <FormGroup>
                                <small>Respiratory Rate</small>
                                <Input size="sm" type="text" />
                            </FormGroup>
                        </Col>
                        <Col lg={2}>
                            <FormGroup>
                                <small>Blood Pressure</small>
                                <Input size="sm" type="text" />
                            </FormGroup>
                        </Col>
                        <Col lg={2}>
                            <FormGroup>
                                <small>Oxygen Saturation</small>
                                <Input size="sm" type="text" />
                            </FormGroup>
                        </Col>
                        <Col lg={2}>
                            <FormGroup>
                                <small>Temperature</small>
                                <Input size="sm" type="text" />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>

                <div className="col-lg-12">
                    <small><b>Cardiovascular Examination</b></small>
                    <Row form>
                        <Col lg={4}>
                            <FormGroup>
                                <small>Normal Rate and Rhythm</small>
                                <Input size="sm" type="text" />
                            </FormGroup>
                        </Col>
                        <Col lg={4}>
                            <FormGroup>
                                <small>Murmurs</small>
                                <Input size="sm" type="text" />
                            </FormGroup>
                        </Col>
                        <Col lg={4}>
                            <FormGroup>
                                <small>Irregular Heart Rate and Rhythm</small>
                                <Input size="sm" type="text" />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div className="col-lg-12 mt-2 text-right">
                    <ButtonGroup className="ml-auto">
                        <Button type="button" size="sm" style={{ width: "80px" }} outline color="warning">
                            <span style={{ cursor: "pointer" }} onClick={() => { this.props.TogglePage(0) }}> Back <FaAngleLeft /> </span>
                        </Button>
                        <Button type="button" size="sm" style={{ width: "80px" }} outline color="primary">
                            <span style={{ cursor: "pointer" }} onClick={() => { this.props.TogglePage(2) }}> Next <FaAngleRight /> </span>
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
})(PageOne);

