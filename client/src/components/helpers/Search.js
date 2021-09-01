import React, { Component } from 'react';
import { Input, Badge } from 'reactstrap';
import {FaPlus} from 'react-icons/fa';
import { connect } from 'react-redux';
import {
  SearchData,
  GetSearchDetail,
  SelectSearchOption,
} from './../../actions/helpers/searchAction';

import {
  ArrangeName
} from './../../actions/helpers/displayAction.js';

import {
  SET_SEARCH_DATA
} from './../../actions/types.js';

class Search extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      type: (props.options[0])?props.options[0].value:null,
      keyword: "",
      typeText: (props.options[0])?props.options[0].text:null,
      keywordText: "",
    };

    // props.SearchData(this.props.suggest, (props.options[0])?props.options[0].value:null, "type");
  }

  async ChangeSearchKey (value, type) {
    await this.setState({
      [type]: value
    })

    if (this.props.hasOwnProperty("onChange")) {
      this.props.onChange(value, type);      
    }

    if (value === "") {
      this.props.SelectSearchOption(this.props.reducer_empty, undefined, this.props.listPage);
    }else {
      // console.log("**************************************__+++");

      // var allFilter = {...this.props.filter};
      // console.log(this.props.filter);
      // console.log(this.props.searchFilters);

      // for (let x = 0, len = this.props.searchFilters.length; x < len; x++) {
      //   allFilter = {
      //     ...allFilter,
      //     [this.props.searchFilters.type]: this.props.searchFilters.keyword,
      //   };
      // }

      // console.log(allFilter);
      
      if (!this.props.hasOwnProperty("triggerSearchOnChange") || this.props.triggerSearchOnChange == true) {
        this.props.SearchData(this.props.suggest, this.props.api, this.state.type, this.state.keyword, this.props.reducer, this.props.reducer_empty, this.props.select, this.props.filter, this.props.sort);
      }

    }

  }

  componentWillMount(){
  }

  render() {
    console.log(":::::::::::::::::::::::::::::::::");
    console.log(this.props);
    return (
      <div id="search">
        <span>{this.props.title}</span>
        <div className="row">
          <div className="col-md-4 type">
            <Input type="select" onChange={(inpt) => {
              console.log("**************_______+++++++++++++++++++++++++**");
              var label = "";
              for (let x = 0; x < inpt.target.childNodes.length; x++) {
                if (inpt.target.childNodes[x].selected == true) {
                  label = inpt.target.childNodes[x].label;
                }
              }
              this.setState({
                typeText: label
              })

              this.ChangeSearchKey(inpt.target.value, "type");
            }}>
              {
                this.props.options.map(({value, text}, i) => (
                  <option value={value}>{ text }</option>
                ))
              }
            </Input>
          </div>
          <div className="col-md-8">
            
            <div id="select-keyword-div">
            {
              (this.props.hasOwnProperty("options2") && this.props.options2 && this.props.options2.hasOwnProperty(this.state.type))
                ?<Input type="select" onChange={(inpt) => {
                  if (inpt.target.value === "" && this.props.suggest){
                    this.props.SelectSearchOption(this.props.reducer);
                  }
                  this.ChangeSearchKey(inpt.target.value, "keyword");

                  var label = "";
                  for (let x = 0; x < inpt.target.childNodes.length; x++) {
                    if (inpt.target.childNodes[x].selected == true) {
                      label = inpt.target.childNodes[x].label;
                    }
                  }
                  this.setState({
                    keywordText: label
                  })
                }} value={this.state.keyword}>
                    {
                      this.props.options2[this.state.type].map(({value, text}, i) => (
                        <option value={value}>{ text }</option>
                      ))
                    }
                </Input>
    
                :<Input type="text" onChange={(inpt) => {
                  if (inpt.target.value === "" && this.props.suggest){
                    this.props.SelectSearchOption(this.props.reducer);
                  }
    
                  this.ChangeSearchKey(inpt.target.value, "keyword");

                  this.setState({
                    keywordText: inpt.target.value
                  })                  
                }} value={this.state.keyword}>
                </Input>
            }
              {
                this.props.hasOwnProperty("addFilter")
                  ?<FaPlus onClick={() => {
                    if (this.state.keywordText != "") {
                      this.props.addFilter(this.state.type, this.state.keyword, this.state.typeText, this.state.keywordText)                      
                      this.setState({
                        keyword: "",
                        keywordText: "",
                      });
                    }
                  }}/>
                  :""
              }
              
            </div>
            
            {
              (this.props.suggest && this.props.searchR.suggestions.length > 0)
                ?<div id="suggestions">
                  {
                    this.props.searchR.suggestions.map((data, i) => (
                      <div className="row" id="suggestion" onClick={() => {
                        this.props.GetSearchDetail("customer/getdata", data._id, this.props.reducer, (dispatch) => {
                          dispatch ({
                            type: SET_SEARCH_DATA
                          })
                        });
                      }}>
                        {
                          this.props.suggest.display(data)
                        }
                      </div>
                    ))
                  }
                </div>
                :""
            }
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchR: state.search
})

export default connect(mapStateToProps, {
  SearchData,
  ArrangeName,
  GetSearchDetail,
  SelectSearchOption
})(Search);
