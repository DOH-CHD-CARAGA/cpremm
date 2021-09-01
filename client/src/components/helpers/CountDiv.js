import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';

const CountDiv = (props) =>  {

  const chart = (props.hasOwnProperty("chart"))?props.chart:false;

  
  return (
    <div id="count-div" className="custom-container" style={(!props.radius)?{borderRadius:0}:{}}>
      <div className="custom-container-title" style={(!props.radius)?{borderRadius:0}:{}}>
        {props.label}
      </div>
      <div className="custom-container-body">
        {
          (chart)
            ? <div>
                <Doughnut data={{
                  datasets: [{
                    data: props.chartData,
                    backgroundColor: [
                    '#e34905',
                    'gray',
                    ],
                  }],
                  labels: props.chartLabel || ["ACTIVE", "INACTIVE"],
                  text: '23%'            
                }} />
              
              <div id="chart-number" className="row">
                {
                  (props.chartData.length < 3)
                    ? <Fragment>
                        <div className="col-md-4 cn1">
                          <span>{props.chartData[0]}</span>
                          <strong>ACTIVE</strong>
                        </div>
                        <div className="col-md-4 cn2"><span>{props.count}</span></div>
                        <div className="col-md-4 cn3">
                          <span>{props.chartData[1]}</span>
                          <strong>IN-ACTIVE</strong>
                        </div>
                      </Fragment>
                    : <div className="col-md-12 cn2"><span>{props.count}</span></div>
                }
              </div> 
            </div>  
            : <h1 className="report-number" style={(props.color)?{color:props.color}:{}}>{props.count}</h1>
        } 
        
      </div>
    </div>

  );
}

export default CountDiv;
