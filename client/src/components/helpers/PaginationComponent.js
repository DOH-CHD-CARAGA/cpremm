import React, { Component } from 'react';
import {
  Input, Button, Spinner,
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import { connect } from 'react-redux';

import {
} from '../../actions/helpers/displayAction';

const Page = (props) => {
  return (
    <PaginationItem active={props.isActive} onClick={props.onClick}>
      <PaginationLink>
        {props.display}
      </PaginationLink>
    </PaginationItem>
  )
}

class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      previousPage: 0,
      limit: 10,
    };

    this.SelectPage = this.SelectPage.bind(this);
    this.setDataLimit = this.setDataLimit.bind(this);
  }

  SetPage (page){
    if (this.state.currentPage != page){

      if (this.props.hasOwnProperty("onChange")){
        this.props.onChange(page, "page");        
      }
      
      this.props.callback(page, this.state.limit);
      this.setState({
        currentPage: page,
      });
    }
  }

  SelectPage (e){
    this.setState({
      previousPage: this.state.currentPage
    })

    var page = e.target.innerText;
    if (isNaN(page)){
      if ((page != "»" && page != '›') && (page != "«" && page != '‹')){
        page = page.slice(0,1);
      }

      if (page == "»" || page == '›'){
        page = this.state.currentPage + (Math.ceil(this.props.pageCount) == this.state.currentPage? 0:1);
      }else if (page == "«" || page == '‹'){
        page = this.state.currentPage - (1 == this.state.currentPage? 0:1);
      }

      this.SetPage(page);
    }else {
      this.SetPage(page*1);
    }
  }

  CreatePaginations (page) {
    let pages = [];
    var pageCount = Math.ceil(this.props.pageCount);
    var diff = 0;


    if (pageCount <= 5){
      for (var x = 0; x < pageCount; x++){

        pages.push(
          <Page
            isActive={(page == x+1)?"active":""}
            display={x+1}
            onClick={this.SelectPage}
          />
        );

      }
    }else {
      if (page > 3){
        pages.push(
          <Page
            isActive={(page == 1)?"active":""}
            display={1}
            onClick={this.SelectPage}
          />
        );
        pages.push(
          <Page
            display={"..."}
          />
        );
      }

      if (page <= 3){
        for (var x = 0; x < 5; x++){
          pages.push(
            <Page
              isActive={(page == x+1)?"active":""}
              display={x+1}
              onClick={this.SelectPage}
            />
          );
        }
      }else {
        diff = pageCount - page;

        if (diff < 4){
          for (var x = (page - (5 - diff)); x < (page + diff); x++){
            pages.push(
              <Page
              isActive={(page == x+1)?"active":""}
              display={x+1}
              onClick={this.SelectPage}
              />
            );
          }
        }else {
          for (var x = (page - 3); x < (page + 2); x++){
            pages.push(
              <Page
              isActive={(page == x+1)?"active":""}
              display={x+1}
              onClick={this.SelectPage}
              />
            );
          }
        }
      }

      if (page < pageCount - 3){
        pages.push(
          <Page
            display={"..."}
          />
        );
        pages.push(
          <Page
            isActive={(pageCount == page)?"active":""}
            display={pageCount}
            onClick={this.SelectPage}
          />
        );
      }

    }


    return pages;
  }

  setDataLimit (e){
    console.log("__________)))!!!!!!");
    console.log(e);
    var val = e.target.value*1;
    this.setState({
      limit: val
    })
    this.props.onChange(val, "limit");
  }

  render() {

    console.log(this.props);

    if ( this.props.page ) {
      if ( this.state.currentPage  != this.props.page) {
        this.setState({
          currentPage: this.props.page
        })
      }
    }

    return (
      <div id="user-act-pagination">
        <Pagination size="md" aria-label="Page navigation example">
          <input type="text" id="page-limit-input" value={this.state.limit} onChange={this.setDataLimit}/>
          <PaginationItem onClick={this.SelectPage}>
            <PaginationLink previous/>
          </PaginationItem>

          {this.CreatePaginations(this.state.currentPage)}

          <PaginationItem onClick={this.SelectPage}>
            <PaginationLink next/>
          </PaginationItem>
          <span className="count" onClick={() => {
            this.setDataLimit({target: {value: this.props.count}})
            this.props.callback(1, this.props.count)
          }}>
            TOTAL: {this.props.count}
          </span><br/>
          <span className="count" onClick={() => {
          }}>
            {
              (this.props.selection.bool)
              ?"SELECTION: " + this.props.selection.count
              :""
            }
          </span>
        </Pagination>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(PaginationComponent);
