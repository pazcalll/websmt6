import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import $ from 'jquery';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyItems from './pages/MyItems';
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import Index from './index.js'
import './App.css';

export default function OuterPage(){
    // return(
    //     <div className="App">
    //     <header className="App-header">
        
    //         <div className="card">
    //             <img src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1138257321%2F960x0.jpg%3Ffit%3Dscale" alt="React Logo" className="card-img-top"/>
    //             <div className="card-body"  id="outer" style={{color:'black'}}>
    //                 <br/>
    //                 <Router>
    //                     <p style={{marginBottom: "19px"}}>
    //                         Welcome to Yazeed's Shop 
    //                     </p>
    //                     Login as
    //                     <br/>
    //                     <div className="btn-group" style={{marginTop: "10px"}}>
    //                         <Link className="btn btn-primary" to="/user">Member</Link>
    //                         <Link to="/guest" className="btn btn-secondary">Guest</Link>
    //                     </div>
    //                     <Switch>
    //                         <Route exact path="/" component={this}/>
    //                         <Route path="/guest" exact strict component={HomePage}/>
    //                     </Switch>
    //                 </Router>
    //             </div>
    //         </div>
    //     </header>
    //     </div>
    // );
    function home(){
      $("#primary-content").fadeIn("fast");
    }
    function handleClick() {
        $( "#primary-content" ).fadeOut( "fast");
    }
    return(
        <Router>
            <div className="central">
                <div className="sidebar">
                    {/* <div className="items"> */}
                    <ul>
                        <li><Link className="side-item" onClick={home} to="/">Home</Link></li>
                        <li><Link className="side-item" onClick={handleClick} to="/items">My Items</Link></li>
                    </ul>
                    {/* </div> */}
                </div>
                <nav className="navbar navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">
                        <img src={logo} width="50" height="50" alt="" className="App-logo"/> React BootslappShop
                    </a>
                    <Dropdown id="drop">
                        <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                            Login as
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item><Link onClick={handleClick} to="/guest">Guest</Link></Dropdown.Item>
                            <Dropdown.Item><Link onClick={handleClick} to="/user">User</Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </nav>
                {/* <Switch>
                    <PrivateRoute path="/user"> */}
                      <AuthButton/>  
                    {/* </PrivateRoute>
                </Switch> */}
                <hr/>
                <div className="container">
                    <div id="primary-content">
                        <Guest/>
                    </div>
                    <Switch>
                        <Route exact path = "/" />
                        <Route path = "/items">
                            <Items/>
                        </Route>
                        <Route path = "/guest">
                            <Guest/>
                        </Route>
                        <Route path="/login">
                            <LoginPage/>
                        </Route>
                        <PrivateRoute path="/user">
                            <User/>
                        </PrivateRoute>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}
// const DoIt = () =>{
    // $(document).ready(function() {
    //     $(".btn").click(function(){
    //         $("#outer").fadeOut(500)
    //         $("#outer").fadeOut('slow')
    //         $("#outer").fadeOut()
    //     });
    // });
// }



let fakeAuth ={
    isAuthenticated: false,
    authenticate(cb){
      fakeAuth.isAuthenticated = true;
      console.log(this.isAuthenticated)
      setTimeout(cb, 100);
    },
    signout(cb){
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

  
  function AuthButton(){
    let location = useLocation();
    let history = useHistory();
    if (fakeAuth.isAuthenticated==true) {
        return (
          $("#drop").fadeOut(),
          <p style={{marginLeft:"85%", marginTop:"10px"}}>
            <button className="btn btn-primary" style={{marginLeft:"100px"}} onClick={() => {
              fakeAuth.signout(() => history.push("/"));
              $("#drop").fadeIn();
              $("#primary-content").fadeIn("fast");
            }}>
              Sign Out
            </button>
          </p>
        );
    }else{
      
        let { from } = location.state || { from: { pathname:"/" } };
        let login = () => {
          fakeAuth.authenticate(() => {
            history.replace(from);
          });
          
        };
        return (
          <div>
            <p>You Must log in to to proceed</p>
            <button onClick={login}>Log in</button>
          </div>
        );
    }
  }

function Guest(){
    
    return <HomePage/>
}

function User() {
  let history = useHistory(); 
  return (
          <p style={{marginTop:"10px"}}>
            {/* Welcome! {" "}
            <button className="btn btn-primary" onClick={() => {
              fakeAuth.signout(() => history.push("/"));
            }}>
              Sign Out
            </button> */}
            <UserPage/>
          </p>
      )
}

function Items(){
  return <MyItems/>
}

function PrivateRoute({children, ...rest}){
    return(
      <Route
        {...rest}
        render={({location})=>
          fakeAuth.isAuthenticated ? (
            children
          ) : (
            <Redirect to={{
              pathname: "/login",
              state: {from:location}
            }}
            />
          )
        }  
      />
    )
  }

  function LoginPage(){
    let history = useHistory();
    let location = useLocation();
  
    let { from } = location.state || { from: { pathname:"/" } };
    let login = () => {
      fakeAuth.authenticate(() => {
        history.replace(from);
      });
      
    };
  
    return(
      <div>
        <p>You Must log in to to proceed</p>
        <button onClick={login}>Log in</button>
      </div>
    );
  }

// export default OuterPage;