import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import DOHSeal from "../../assets/images/doh-seal.png";
import "@fortawesome/fontawesome-free/css/all.min.css"
function Sidenav({ color, CPreMM_account }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const publicSideNav = [
    {
      label: "Portal",
      link: "header",
    },
    {
      label: "CPreMM Portal",
      link: "/CPreMM-Portal",
      icon: "🛠️"
    }
  ] 
  
  const adminSideNav = [
    {
      label: "Portal",
      link: "header"
    },
    {
      label: "CPreMM Portal",
      link: "/CPreMM-Portal",
      icon: "🛠️"
    },
    {
      label: "Admin Section",
      link: "header"
    },
    {
      label: "Job Order List",
      link: "/Job-Order-List",
      icon: "📃"
    }
  ]

  const Tabs = ()=>{
    if(CPreMM_account!==null){
      return adminSideNav.map((val, k)=>{
       return <>
          {
            val.link==="header"?
            <Menu.Item className="menu-item-header" key={k}>
             {val.label}
            </Menu.Item>
          :
          <Menu.Item key={k}>
            <NavLink to={val.link}>
              <span
                className="icon"
                style={{
                  background: page === val.label ? color : "green",
                }}
              >
              {val.icon}
              </span>
              <span className="label">{val.label}</span>
            </NavLink>
          </Menu.Item>
          }
          </>
      })
    } else {
       return publicSideNav.map((val, k)=>{
        return <>
          {
            val.link==="header"?
            <Menu.Item className="menu-item-header" key={k}>
             {val.label}
            </Menu.Item>
          :
          <Menu.Item key={k}>
            <NavLink to="/CPreMM-Portal">
              <span
                className="icon"
                style={{
                  background: page === val.label ? color : "green",
                }}
              >
              {val.icon}
              </span>
              <span className="label">{val.label}</span>
            </NavLink>
          </Menu.Item>
          }
        </>
      })
    }
  }
  return (
    <>
      <div className="brand">
      <NavLink to="/">
        <img src={DOHSeal} alt="🚫" />
        <b style={{ color: "darkgreen", marginLeft: 10, fontSize: "18px",  }}>DOH Caraga XIII</b>
        </NavLink>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
      {Tabs()}
      </Menu>
    </>
  );
}

export default Sidenav;
