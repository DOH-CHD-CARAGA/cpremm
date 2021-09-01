import React from 'react';
import { connect } from 'react-redux';
import { Table, InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import { FaSearch } from "react-icons/fa";

import DataTable from '../../helpers/DataTable';

import {
    GetList,
} from '../../../actions/helpers/displayAction';

import VaccineeTable from './VaccineeTable';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

class VaccineeProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPage: 0
        }

        this.TogglePage = this.TogglePage.bind(this);

    }

    TogglePage(num){
        this.setState({
            showPage: num
        })
    }

    render() {
        return (
            <div className='row justify-content-center' id="hf-personnel">
                <div className='col-md-12'>
                    <div className='custom-cards-container'>
                        <div className='custom-cards rounded-container box-shadow-container'>
                            {
                                (this.state.showPage == 0) ?
                                    <VaccineeTable TogglePage={this.TogglePage}/>
                                    : null
                            }
                            {
                                (this.state.showPage == 1) ?
                                    <PageOne TogglePage={this.TogglePage}></PageOne>
                                    : null
                            }
                            {
                                (this.state.showPage == 2) ?
                                    <PageTwo TogglePage={this.TogglePage}></PageTwo>
                                    : null
                            }
                                                        {
                                (this.state.showPage == 3) ?
                                    <PageThree TogglePage={this.TogglePage}></PageThree>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
    GetList,
})(VaccineeProfile);

