import { Switch, Route, Redirect } from "react-router-dom"
// eslint-disable-next-line
import { useState, useEffect } from "react"
import api from "./api/api"
import "antd/dist/antd.css"
import "./assets/styles/main.css"
import "./assets/styles/responsive.css"
import env from "react-dotenv";
//Components 
import LandingPage from './pages/LandingPage'
//Views
import JobOrderForm from "./views/JobOrderForm"
import JobOrderList from "./views/JobOrderList"

const App = ()=> {
  // eslint-disable-next-line
  const [users, setusers] = useState(null)
  // eslint-disable-next-line
  const [devices, setdevices] = useState(null)
  // eslint-disable-next-line
  const [offices, setoffices] = useState(null)
  
  useEffect(()=>{
    const res = api.getDevices()
    console.log(res.data)
  },
  // eslint-disable-next-line
  [])
  

  return (
    <div className="App">
      {console.log(env)}
        <Switch>
        <Route path="/" exact 
          render={(props) => 
          <LandingPage
          JobReqFormUI={
            <JobOrderForm
              users={users}
              devices={devices}
              offices={offices}
            />
          }
          JobOrderList={
            <JobOrderList 
            
            />
          }
          />}
        />

        <Redirect from="*" to={"/"}/>
        </Switch>
    </div>
  );
}

export default App;