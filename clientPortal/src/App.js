import { Switch, Route, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import LandingPage from "./pages/LandingPage";
import CPreMMPortal from "./pages/CPreMMPortal";
import JobOrderList from "./pages/JobOrderList";

import { useEffect, useState } from "react";
import cpremmApi from "./controllers/api/CPreMM/cpremm-api";

const App = ()=> {
  const [CPreMM_account, setCPreMM_account] = useState(null)

  const checkIfLogin_CPreMM = async()=>{
    const res = await cpremmApi.checkAuth()
    if(res.status===200){
      setCPreMM_account(res.data)
    }
    else {
      setCPreMM_account(null)
    }
  }

  const RedirectURL = ()=>{
    const url = localStorage.getItem("URL")
    if(url!==undefined){
      return url
    }
    else {
      return "/"
    }
  }
  useEffect(()=>{
    checkIfLogin_CPreMM()
  }, 
  [])

  return (
    <div className="App">
      <Switch>
        {
        CPreMM_account===null&&
          <Route path="/sign-in" exact component={SignIn} />
        }
        <Main
        CPreMM_account={CPreMM_account}
        >
          <Route exact path="/"
          render={(props) => 
            <LandingPage
          
            /> }
          />
          <Route exact path="/CPreMM-Portal"
            render={(props) => 
            <CPreMMPortal
            
            />}
          />
          {
            CPreMM_account!==null &&  CPreMM_account.role.name === "Master" &&
            <Route exact path="/Job-Order-List"
            render={(props) => 
              <JobOrderList
              
              />}
            />
          }
          <Redirect from="*" to={RedirectURL()} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
