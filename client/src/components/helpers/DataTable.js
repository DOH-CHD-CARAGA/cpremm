import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Badge, Collapse, } from 'reactstrap';
import { FaSearch, FaTimesCircle, FaPlus, FaDownload, FaUpload, FaChartBar, FaAngleDown, FaAngleUp, FaTrash, FaQrcode } from 'react-icons/fa';

import PaginationComponent from './PaginationComponent';
import Search from './Search';
import ReactToExcel from 'react-html-table-to-excel';

import {
  GetList, TypeOf
} from './../../actions/helpers/displayAction';

import {
  SearchData
} from './../../actions/helpers/searchAction';

import {
  GetLastDay
} from './../../actions/helpers/dateAction';
import Label from 'reactstrap/lib/Label';

class DataTable extends Component {
  constructor(props) {
    super();
    this.state = {
      header: (typeof props.table.head == "function") ? null : [...props.table.head],

      search: {
        keyword: "",
        type: (props.search) ? props.search.options[0].value : null,
      },

      date: {
        from: "",
        to: ""
      },

      page: 1,
      limit: 10,

      sort: (props.sort) ? { ...props.sort } : null,

      filters: [],

      isOpen: false,
    }

    this.searchOnChange = this.searchOnChange.bind(this);
    this.paginationOnChange = this.paginationOnChange.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  searchOnChange(value, type) {
    this.setState({
      search: {
        ...this.state.search,
        [type]: value
      }
    })
  }

  paginationOnChange(value, type) {
    this.setState({
      ...this.state,
      [type]: value
    })

    if (this.props.hasOwnProperty("paginationOnChange")) {
      if (type == "limit" || type == "page") {
        this.props.paginationOnChange(value, type);
      }
    }

  }

  changeDate(e) {
    var tar = e.target;
    var type = tar.getAttribute("data-type");

    if (type == "from" && !this.state.date.to) {
      var toDate = tar.value.split("-");
      toDate[2] = this.props.GetLastDay(new Date(tar.value))
      toDate = toDate.join("-");
      this.setState({
        date: {
          to: toDate,
          [type]: tar.value
        }
      })

      return;
    }

    this.setState({
      date: {
        ...this.state.date,
        [type]: tar.value
      }
    })

  }

  addFilter(type, value, typeText, keywordText) {

    this.setState({
      isOpen: true
    })

    console.log();
    this.setState({
      filters: [
        ...this.state.filters,
        {
          value: value,
          type: type,
          typeText: typeText,
          keywordText: keywordText,
        }
      ]
    })
  }

  removeFilter(i, type, value) {

    const filters = this.state.filters.filter((filter, ind) => ind != i);

    if (filters.length == 0) {
      this.setState({
        isOpen: false
      })
    }

    this.setState({
      filters: [...filters],
    });
  }


  render() {
    const { toDisplay, count, page, listPage } = this.props.dataBank;
    var isViewSearch = (this.props.hasOwnProperty("search")), isViewDate = (this.props.hasOwnProperty("date"));
    var filterS = { ...this.props.filter };
    var filterP = { ...this.props.filter };

    if (this.state.search.keyword) {
      filterP[this.state.search.type] = this.state.search.keyword;
    }
    if (this.state.date.from) {
      filterP["date"] = this.state.date;
      filterS["date"] = this.state.date;
    };
    // console.log(filterS);

    if (this.state.filters.length > 0) {
      for (let x = 0, len = this.state.filters.length; x < len; x++) {
        filterS[this.state.filters[x].type] = this.state.filters[x].value;
      }
    }

    // console.log("::::::::::::::*****+++++++++++=");
    // console.log(filterS);

    var suggest = (this.props.search) ? this.props.search.suggest : [];
    var select = (this.props.search) ? this.props.search.select : {};
    var api = this.props.api.get;
    var searchReducer = this.props.reducers.search;

    return (
      <div id={(this.props.title.toLowerCase().split(" ").join("-")) + "-table-div"} className="list-table">
        <div>
          <div className="custom-container-title" id="table-header">
            {/*this.this.props.type*/}
            <div>
              <span>{this.props.title}</span>
            </div>
            <div>

              {
                (this.props.hasOwnProperty("search"))
                  ? <Fragment>
                    <div style={(isViewSearch) ? {} : { display: "none" }}>
                      <Search
                        title={"Search " + this.props.title}
                        options={(this.props.search) ? this.props.search.options : []}
                        options2={(this.props.search) ? this.props.search.options2 : []}
                        api={api}
                        reducer_empty={this.props.reducers.get}
                        reducer={searchReducer}
                        suggest={suggest}
                        select={select}
                        filter={filterS}
                        sort={this.props.sort}
                        page={page}
                        listPage={listPage}
                        onChange={this.searchOnChange}
                        addFilter={this.addFilter}
                        searchFilters={this.state.filters}
                        triggerSearchOnChange={false}
                      />
                    </div>

                    <div id="date-filter" style={(isViewDate) ? {} : { display: "none" }}>
                      <span>Filters</span>
                      <div id="date-filter-input">
                        <input type="date" onChange={async (e) => {
                          await this.changeDate(e);
                          if (this.props.hasOwnProperty("changeDate")) {
                            this.props.changeDate(this.state.date);
                          }
                        }} data-type="from" value={this.state.date.from} />

                        <input type="date" onChange={async (e) => {
                          await this.changeDate(e);
                          if (this.props.hasOwnProperty("changeDate")) {
                            this.props.changeDate(this.state.date);
                          }
                        }} data-type="to" value={this.state.date.to} />
                      </div>
                    </div>

                    <div id="search-svg-button" style={{ top: 20 }}>
                      <FaSearch className="clickable" onClick={() => {
                        // this.props.GetList(this.props.api.get, this.props.reducers.get, 1, this.state.limit, filterP, this.props.sort);
                        console.log(":::::::::::::::::)___");
                        console.log(filterS);
                        console.log(this.state.search.keyword);
                        this.props.SearchData(suggest, api, this.state.search.type, this.state.search.keyword, searchReducer, this.props.reducers.get, select, filterS, this.props.sort, undefined, this.state.limit, true);
                      }} />
                    </div>

                  </Fragment>
                  : ""
              }


              {
                (this.props.hasOwnProperty("addData") && this.props.addData != null)
                  ? <div id="search-svg-button" style={{ top: 20 }}>
                    <FaPlus className="clickable" onClick={this.props.addData} />
                  </div>
                  : ""
              }
              <div id="search-svg-button">
                <ReactToExcel
                  table={(this.props.title.toLowerCase().split(" ").join("-")) + "-table"}
                  filename={this.props.title.toUpperCase()}
                  sheet="sheet 1"
                  buttonText={<FaDownload />}
                />
              </div>
              {
                this.props.hasOwnProperty("upload")
                  ? <div id="search-svg-button">
                    <FaUpload onClick={this.props.upload.callback} />
                  </div>
                  : ""
              }
              {
                (this.props.hasOwnProperty("reportToggle"))
                  ? <div id="search-svg-button" style={{ top: 20 }}>
                    <FaChartBar className="clickable" onClick={() => {
                      this.props.reportToggle();
                    }} />
                  </div>
                  : ""
              }
              {
                this.props.hasOwnProperty("trash")
                  ? <div id="search-svg-button">
                    <FaTrash onClick={this.props.trash.callback} />
                  </div>
                  : ""
              }
              {
                this.props.hasOwnProperty("qrToggle")
                  ? <div id="search-svg-button">
                    <FaQrcode onClick={this.props.qrToggle} />
                  </div>
                  : ""
              }
            </div>
          </div>

          <Collapse isOpen={this.state.isOpen}>
            <div className="custom-container-title" id="table-header-filters">
              <div className="col-md-12">
                <Label style={{ marginRight: "10px" }}>Filters: </Label>
                {
                  this.state.filters.map(({ value, type, typeText, keywordText }, i) => {
                    return (
                      <Badge style={{ marginRight: "10px" }} color="primary" pill>
                        {typeText + " | " + keywordText}
                        <FaTimesCircle
                          className="filter-remove-icon"
                          onClick={() => {
                            this.removeFilter(i, value, type)
                            console.log(":::::::::::::::::::''''''''''__________--");

                            var keyword = this.state.search.keyword;

                            console.log(keyword);
                            console.log(value);

                            if (value == keyword) {
                              keyword = "";
                              this.setState({
                                search: {
                                  ...this.state.search,
                                  keyword: "",
                                }
                              });
                            }

                            console.log(keyword);
                            console.log(value);
                            console.log(filterS);

                            delete filterS[type];

                            this.props.SearchData(suggest, api, this.state.search.type, keyword, searchReducer, this.props.reducers.get, select, filterS, this.props.sort, undefined, this.state.limit);
                          }}
                        />
                      </Badge>
                    )
                  })
                }
              </div>
            </div>
          </Collapse>

          <div className="custom-container-body table-container">

            <table id={(this.props.title.toLowerCase().split(" ").join("-")) + "-table"} className="table table-hover table-striped">
              <thead>
                {
                  (this.state.header == null)
                    ? this.props.table.head()
                    : <tr>
                      {
                        this.state.header.map((th, i) => {
                          return (
                            <th className="clickable" scope="col" onClick={async () => {
                              console.log(th);
                              if (th.hasOwnProperty("prop")) {
                                var header = this.state.header.map((head, i) => {
                                  return {
                                    ...head,
                                    selected: false,
                                    rotated: false,
                                  }
                                });

                                header[i] = {
                                  ...header[i],
                                  selected: true,
                                  rotated: (th.selected && th.hasOwnProperty("rotated")) ? !th.rotated : (th.selected) ? th.selected : undefined
                                }


                                var tempSort = { [header[i].prop]: (header[i].rotated) ? -1 : 1 }
                                var res = await this.props.SearchData(suggest, api, this.state.search.type, this.state.search.keyword, searchReducer, this.props.reducers.get, select, filterS, { ...tempSort }, undefined, this.state.limit);
                                this.setState({
                                  header: [...header],
                                  sort: { ...tempSort }
                                })
                              }

                            }}>
                              <span style={{ display: "flex" }}>
                                {th.name}
                                {
                                  (th.hasOwnProperty("prop") && th.hasOwnProperty("selected") && th.selected)
                                    ? <FaAngleUp style={{ marginTop: "3px", marginLeft: "5px", fontSize: "15px" }} className={(th.rotated) ? "rotated" : ""} />
                                    : ""
                                }
                              </span>
                            </th>
                          )
                        })
                      }
                    </tr>
                }
              </thead>
              <tbody>
                {toDisplay.map((data, i) => {
                  return (
                    this.props.table.body(data, ((page - 1) * 10) + i)
                  )
                })}
              </tbody>
            </table>

          </div>
        </div>

        <div className="custom-container-title" id="user-act-pagination-parent">
          <div className="col-md-12 title-in-div">
            <PaginationComponent
              pageCount={count / this.state.limit}
              callback={(page, limit) => {
                // this.props.GetList(this.props.api.get, this.props.reducers.get, page, limit, filterP, this.props.sort);
                this.props.SearchData(suggest, api, this.state.search.type, this.state.search.keyword, this.props.reducers.get, this.props.reducers.get, select, filterS, this.props.sort, page, limit, true);
              }}
              page={page}
              selection={{ ...this.props.selection }}
              count={count}
              onChange={this.paginationOnChange}
            />
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
  GetLastDay,
  SearchData,
})(DataTable);
