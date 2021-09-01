import React from 'react';

import { connect } from 'react-redux';
// import Search from '../Search';
import PaginationComponent from '../helpers/PaginationComponent';
import {FaMinusCircle, FaPlusCircle, FaUserPlus} from 'react-icons/fa';
import {
  ArrangeDate,
} from './../../actions/helpers/displayAction';

const Logs = (props) => {
  const tableLabel = {
    D: "DRIVERS",
    P: "USERS",
    O: "OWNERS"
  };
  var selections = [
    {val:"name", display:"Name", hasOptions: true, hideIn:""},
  ];
  var options = {
    name: [
      {val:"last", display:"Last"},
      {val:"mid", display:"Middle"},
      {val:"first", display:"First"}
    ],
  };

  return (
    <div className="custom-container">
      <div className="custom-container-title" id="table-header">
        {/*this.props.type*/}
        <div className={`col-md-3 title-in-div`}>
          {tableLabel[props.type]}
        </div>
        <div className={`col-md-9 offset-md-0`}>
          {/*
            <Search type={tableLabel[props.type]} selections={selections} options={options}/>
          */}
        </div>
        {/*
          <div className={`col-md-${(props.type != "O")?0:1}`} hidden={(props.type != "O")?"hidden":""}>
            <span className="user-plus-fa" onClick={props.toggle}><FaUserPlus /></span>
          </div>
          */}
      </div>
      <div className="custom-container-body table-container">
      <table className="table table-hover" id="logs">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">No.</th>
            <th scope="col">message</th>
            <th scope="col">functionality</th>
            <th scope="col">date</th>
          </tr>
        </thead>
        <tbody>
            {props.logs.map(({message, location, level, functionality, date, resolved, viewed}, i) => (
              <tr className={((viewed)?"":"unviewed ") + "clickable"} onClick={() => {
                props.ShowLog(i);
                props.toggle();
              }}>
                <td>
                  <div className={(resolved)?"resolved":"level-" + level} style={{width:"20px", height:"50px"}}>
                  </div>
                </td>
                <td>{ i + 1 }</td>
                <td>{ message }</td>
                <td>{ functionality }</td>
                <td>{ props.ArrangeDate(date)() }</td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
      <div className="custom-container-title" id="user-act-pagination-parent">
        <div className="col-md-12 title-in-div">
          <PaginationComponent pageCount={(props.count)/10} callback={props.GetNextBatch} count={props.count}/>
        </div>
      </div>
    </div>
  );
}

const mapProps = () => ({
  ArrangeDate
})

export default connect(mapProps, {
})(Logs);
