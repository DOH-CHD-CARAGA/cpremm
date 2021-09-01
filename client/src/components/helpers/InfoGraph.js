import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Line, Bar, HorizontalBar } from 'react-chartjs-2';
import { FaSearch } from 'react-icons/fa';

import {
  GetMonths,
  GetMonth,
  GetYear,
  GetDate,
} from './../../actions/helpers/dateAction'

class InfoGraph extends React.Component {

  constructor (props) {
    super(props);


    this.state = {
      months: props.GetMonths(),

      selected: {
        // month: props.GetMonth(),
        // year: props.GetYear(),
        month: "ALL",
        year: "ALL",
      },
    }

    this.selectdate = this.selectdate.bind(this);
  }

  async selectdate (e) {

    var tar = e.target;

    await this.setState({
      ...this.state,
      selected: {
        ...this.state.selected,
        [tar.id]: tar.value
      } 
    });

    var tempD = {
      d: 1,
      m: (this.state.selected.month)*1,
      y: (this.state.selected.year)*1      
    }
  }
  

  render () {
    let Grph = "";

    if (this.props.type == "Line") {
      Grph = <Line
              data={{
                'labels': this.props.data.labels,
                'datasets':this.props.data.datasets,
              }}
              options={this.props.options}
            />
    }else if (this.props.type == "Bar") {
      Grph = <Bar
                data={{
                  'labels': this.props.data.labels,
                  'datasets':this.props.data.datasets,
                }}
                options={this.props.options}
              />
    }else if (this.props.type == "HorizontalBar") {
      Grph = <HorizontalBar
                data={{
                  'labels': this.props.data.labels,
                  'datasets':this.props.data.datasets,
                }}
                options={this.props.options}
              />
    }


    return (
      <div id={this.props.title.toLowerCase().split(" ").join("-")} className="infograph">
        <div className="custom-container">
          <div className="row custom-container-title">
            <div className="col-md-4 title">
                { this.props.title }
            </div>
            {
              (this.props.hasOwnProperty("changeDate"))
              ?<div className="col-md-8 filter">
                {
                  (this.props.hasOwnProperty("graphFilter"))
                    ? this.props.graphFilter
                    :<select className="d-select" id="year" value={this.state.selected.year} onChange={this.selectdate}>
                      <option value="ALL">ALL</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                    </select>
                }

                {
                  (this.state.selected.year != "ALL")
                  ?<select className="d-select" id="month" value={this.state.selected.month} onChange={this.selectdate}>
                    <option value="ALL">ALL</option>  
                    {                
                      this.state.months.map((month, i) => {
                        return (
                          <option value={i+1}>{month}</option>                  
                        )
                      })
                    }
                  </select>
                  :""
                }
                <FaSearch onClick={() => {
                  this.props.changeDate(this.state.selected);
                }}/>
              </div>
              :""
            }
          </div>
          {/*<Map/>*/}
          <div>
            {(this.props.data.datasets && this.props.data.datasets.length > 0)
              ?Grph
              : ""
            }
          </div>
        </div>
      </div>
    );    
  }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
  GetMonths,
  GetMonth,
  GetYear,
  GetDate,
})(InfoGraph);
