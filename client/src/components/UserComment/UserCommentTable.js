import React, {Fragment} from 'react';
import { connect } from 'react-redux';

import {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
} from '../../actions/helpers/displayAction';

import {
  SetUserCommentDetail,
  SetUserCommentDefault,
  SendCommentReply,
} from '../../actions/userCommentAction';

import {
  SET_USER_COMMENT_DETAIL
} from '../../actions/types';

import DataTable from '../helpers/DataTable';

class UserCommentTable extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      replies: [],
      button: [],
    }

    this.changeButtonStatus = this.changeButtonStatus.bind(this);
    this.changeReply = this.changeReply.bind(this);
  }

  changeButtonStatus(ind, status) {
    var buttTemp = [...this.state.button];
    buttTemp[ind] = status;
    this.setState({
      button: [...buttTemp]
    })    
  }

  changeReply(ind, reply) {
    var repTemp = [...this.state.replies];
    repTemp[ind] = reply;
    this.setState({
      replies: [...repTemp]
    })
  }
    
  render ()  {
      var commentType = ["", "Suggestion", "Possible Bug", "Issue"]

      return (

        <Fragment>

          <DataTable
            addData={() => {
              this.props.SetUserCommentDefault();
              this.props.toggleModal("add");
            }}
            title = {this.props.title}
            filter = {this.props.filter}
            api = {{ get: "userComment" + this.props.api, search: "userComment" + this.props.api }}
            dataBank = { this.props.userComment }
            reducers = {this.props.reducers}
            search = {{
              options: [ {value: "comment", text: "User Comment"} ],
              select: [], suggest: false,
            }}
            table = {{
              head: () => {
                return ""
              },
              body: (userComment, i) => {
                console.log(userComment);
                return (
                  <tr data-id={userComment._id} onClick={ async (e) => {

                  }}>
                    <div className="row">
                      <div className="col-md-12 row-1">{this.props.ArrangeName(userComment.user.name)}<i><em>{userComment.commentID}</em> {this.props.ArrangeDate(userComment.date)}</i> <span>{ commentType[userComment.commentType] }</span></div>
                      {/* <div className="col-md-12 row-2">{userComment.commentID} <span>{this.props.ArrangeDate(userComment.date)}</span></div> */}
                      <div className="col-md-12 row-3">{ userComment.comment }</div>
                      <div className="reply-div">
                        {/* <span>REPLY</span> */}
                        {
                          userComment.replies.map((reply, i2) => {
                            return(
                              <Fragment>
                                <div className="col-md-12 row-1">{this.props.ArrangeName(reply.user.name)} <i>{this.props.ArrangeDate(reply.date)}</i></div>
                                {/* <div className="col-md-12 row-2"><span>{this.props.ArrangeDate(userComment.date)}</span></div> */}
                                <div className="col-md-12 row-3">{ reply.msg }</div>                                
                              </Fragment>
                            )
                          })
                        }
                      </div>   
                      <div className="col-md-12 comment-actions">
                        <input type="textbox" placeholder="Message here..." value={this.state.replies[i]} onChange={(e) => {

                          this.changeReply(i, e.target.value);

                        }}/>
                        <button 
                          disabled={(this.state.button[i])?"disabled":""}
                          className={(this.state.button[i])?"clicked":"unclick"}
                          onClick={async (e) => {

                            this.changeButtonStatus(i, 1);

                            
                            this.props.SendCommentReply(userComment, this.state.replies[i]) 
                              .then(res => {
                                if (res) {
                                  this.changeButtonStatus(i, 0);
                                  this.changeReply(i, "");
                                }
                              })
                              .catch(err => {
                                console.log(err);
                              })
                            
                          }}
                        >{(this.state.button[i])?"Sending...":"Reply"}</button>
                      </div>
                    </div>
                  </tr>
                )
              }
            }}
          />



        </Fragment>
      );
  }
}

const mapStateToProps = (state) => ({
  userComment: state.userComment
})

export default connect(mapStateToProps, {
  ArrangeDate,
  ArrangeName,
  GetList,
  GetDetail,
  SetUserCommentDetail,
  SetUserCommentDefault,
  SendCommentReply,
})(UserCommentTable);
