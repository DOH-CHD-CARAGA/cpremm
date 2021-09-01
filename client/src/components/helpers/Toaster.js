import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from 'react-redux';

const Toaster = (props) =>  {
  // const fa = (props.alert.type == "Success") ? <FaCheckCircle className="fa-success"/> : <FaTimesCircle className="fa-success"/>;

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(Toaster);
