import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Table, InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import { FaSearch,FaAngleLeft, FaAngleRight } from "react-icons/fa";

import {
    GetList,
} from '../../../actions/helpers/displayAction';

class VaccineeTable extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                    <h4><b>Vaccinee's List</b></h4>
                    <Fragment>
                        <InputGroup className="mb-2">
                            <Input className="form-control rounded-0" size="sm" placeholder="Search here..." />
                            <Button outline className="rounded-0" size="sm" color="success">Search <FaSearch /></Button>
                        </InputGroup>

                        <Table striped hover style={{ fontSize: '11px' }}>
                            <thead>
                                <tr style={{ borderTop: 'none' }}>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Office</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr onClick={ () => {
                                    this.props.TogglePage(1)
                                }}>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Fragment>
        
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
    GetList,

})(VaccineeTable);

