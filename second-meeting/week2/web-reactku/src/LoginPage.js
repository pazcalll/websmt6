import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LoginPage() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Form Login</h2>
        <br/>
        
        <div className="card">
            <div className="card-body" style={{color:'black'}}>
                <h2 style={{color:'#242424', textAlign:'center'}}>Tugas Pertemuan <br/>Ketiga</h2>
                <br/>
                <Container>
                    <Row className="form-group">
                        <Col>Username</Col>
                        <Col><input type="text" name="" value="" className="form-control" style={{minWidth:'300px'}}/></Col>
                    </Row>
                    <Row className="form-group">
                        <Col>Password</Col>
                        <Col><input type="password" name="" value="" className="form-control" style={{minWidth:'300px'}}/></Col>
                    </Row>
                    <Row className="form-group">
                    </Row>
                </Container>
            </div>
                <a className="btn btn-success" style={{marginLeft:'35px', marginRight:'35px', marginBottom:'10px'}}>Login</a>
                <span style={{fontSize:'20px', color:'#242424', alignSelf:'center'}}><input type="checkbox" name="remember me"/> Remember me</span>
                <br/><br/>
                <a className="btn btn-danger" style={{alignSelf:'center', marginLeft:'35px', marginRight:'35px', marginBottom:'35px', maxWidth:'100px'}}>Cancel</a>
        </div>
      </header>
    </div>
  );
}


// class LoginPage extends Component{
//     render(){
//         return(
//             // <head>
//             //     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
//             // </head>
//             <div className="loginForm">
//                 <h2>Form Login</h2>
//                 <div className = "head">
//                     <h2>Tugas Pertemuan Ketiga</h2>
//                 </div>
//                 <div className="input">
//                     <div className="userLabel">
//                         <h3>Username</h3>
//                     </div>
//                     <div className="userBar">
//                         <input type="text" name="userInp" />
//                     </div>
//                     <div className="passLabel">
//                         <h3>Username</h3>
//                     </div>
//                     <div className="passBar">
//                         <input type="text" name="passInp" />
//                     </div>
//                 </div>
//                 <a href="#" className="loginBtn">Login</a>
//                 <br/><br/>
//                 <input type="checkbox" name="box" className="checkBox"/>Remember Me
//                 <br/><br/>
//                 <a href="#">Cancel</a>
//             </div>
//         );
//     }
// }

export default LoginPage;