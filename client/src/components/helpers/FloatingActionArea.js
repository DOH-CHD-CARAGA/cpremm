import React, { Component } from 'react';
import { connect } from 'react-redux';

import {MdReport} from 'react-icons/md';
import { FormGroup } from 'reactstrap';

import InfoModal from './InfoModal';
import LabelInput from './LabelInput';

import {
    SetValue,
} from './../../actions/helpers/displayAction.js';

import {
    addUserComment,
} from './../../actions/userCommentAction.js';
  
import {
    SET_USER_COMMENT_VALUE
} from './../../actions/types.js';

class FloatingActionArea extends Component {

    constructor (props) {
        super();

        this.state = {
            modal: false,
        }

        this.toggle = this.toggle.bind(this);

    }

    toggle () {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        var { userComment } = this.props.userComment;
        var butts = [];
      
        return (
            <div id="floating-action-area" className="floating">

            <InfoModal
                size = {"50%"}
                modal = {this.state.modal}
                toggle = {this.toggle}
                title = {"Comment/Report Issue"}
                form = {
                    <div id="userComment-form" className="entry-form">
                        <div>
                        <div className="custom-container">
                            {/* <div className="custom-container-title">
                                Detail
                            </div> */}
                            <div className="custom-container-body">
                                <FormGroup>
                                    <LabelInput
                                        label={"Comment Type: "} value={userComment.commentType} prop="commentType" req={1} reducer={SET_USER_COMMENT_VALUE}
                                        type="select" options={[{text: "Suggestion", value: 1}, {text: "Data Error", value: 2}, {text: "Functionality Issues", value: 3}]}
                                        onChange={(e) => {
                                            this.props.SetValue(e, SET_USER_COMMENT_VALUE);
                                        }}
                                    />
                                    <LabelInput
                                        label={"Comment: "} value={userComment.comment} prop="comment" req={1} reducer={SET_USER_COMMENT_VALUE} type="textarea"
                                        onChange={(e) => {
                                            this.props.SetValue(e, SET_USER_COMMENT_VALUE);
                                        }}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                
                        </div>
                    </div>
                }
                fade = {true}
                buttons = {[{type: "SEND", callback: this.props.addUserComment}]}
            />

            <MdReport id="report-button" onClick={this.toggle}/>
            
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    userComment: state.userComment
})

export default connect(mapStateToProps, {
    SetValue,
    addUserComment,
})(FloatingActionArea);
