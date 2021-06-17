import React, {Component, useState, useContext} from "react";
import {connect} from "react-redux"; 
import {Redirect} from "react-router-dom"; 
import {loginUser} from "../actions/auth";
import {verifyAuth} from "../actions/auth";
import {withStyles} from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar"; 
import Button from "@material-ui/core/Button"; 
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography"; 
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import firebase from "firebase";


const styles = () => ((
    global= {
        body: {
            backgroundColor: "#fff"
        },
        paper: {
            marginTop: 100,
            display: "flex",
            padding: 20,
            flexDirection: "column",
            alignItems: "center"
        },
        avatar: {
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#f50057"
        },
        form: {
            marginTop: 1
        },
        errorText: {
            color: "#f50057",
            marginBottom: 5,
            textAlign: "center"
        }
    }
));

let img = "";
let displayname = "";
let email = "";
let phone = "";
let verification = "";


class Login extends Component {
    state = {email: "", password: ""};    

    handleEmailChange = ({target}) =>{
        this.setState ({email: target.value});
    };
    handlePasswordChange = ({target}) =>{
        this.setState ({password: target.value});
    };
    handleSubmit = () => {
        const {dispatch} = this.props;
        const {email, password} = this.state;
        dispatch (loginUser (email, password));
    };
    googleLogin = () => {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(res=>{
                // console.log(res.user.email)
                // this.Auth.setLoggedIn(true);
                // dispatch(verifyAuth())
                this.setState = {email: res.user.email}
                img = res.user.photoURL
                displayname = res.user.displayName
                email = res.user.email
                phone = res.user.phoneNumber
                verification = res.user.emailVerified
                // console.log(res.user)
            })
            .catch(e=>{
                console.log(e)
            })
    }
    render () {
        const {classes, loginError, isAuthenticated} = this.props; 
        if (isAuthenticated) {
            return (

                <Redirect 
                    to = {{
                        pathname:"/",
                        state:{img: img, displayname: displayname, email: email, verification: verification, phone: phone}
                    }} 
                /> 
            )
        }
        else {
            return (
                <Container id = "loginContainer" component = "main" maxWidth = "xs">
                    <Paper className = {classes.paper}>
                        {/* <Avatar className = {classes.exe}> */}
                            {/* <LockOutlinedIcon /> */}
                        <img style={{maxWidth:"200px", maxHeight:"200px"}} src="https://upload.wikimedia.org/wikipedia/commons/7/78/Symbol-washing-machine.svg" alt="logo"/>
                        <Typography align="center" component = "h1" variant="h4">
                            <span style={{textAlign:"center"}}>
                                Welcome to Washing Machine Shop    
                            </span>
                            <hr style={{marginTop: 40, marginBottom:40}}/>
                        </Typography>
                        {/* </Avatar> */}
                        <Typography component = "h1" variant = "h5">
                            <span style={{color:"gray"}}>
                                Sign in
                            </span>
                        </Typography>
                        {/* <TextField
                            variant = "outlined"
                            margin = "normal"
                            fullWidth
                            id = "email"
                            label = "Email Address"
                            name = "email"
                            onChange = {this.handleEmailChange}
                        />
                        <TextField
                            variant = "outlined"
                            margin = "normal"
                            fullWidth
                            name = "password"
                            label = "Password"
                            type = "password"
                            id = "password"
                            onChange = {this.handlePasswordChange}
                        />
                        {loginError && (
                            <Typography component = "p" className = {classes.errorText}>
                                Incorrect email or password.
                            </Typography>
                        )}
                        <Button
                            type = "button"
                            fullWidth
                            variant = "contained"
                            color = "primary"
                            className = {classes.submit}
                            onClick = {this.handleSubmit}
                        >
                            Sign In
                        </Button> */}
                        <Button 
                                type = "button"
                                fullWidth
                                variant = "contained"
                                color = "success"
                                className = {classes.submit}
                                onClick = {this.googleLogin}
                                style={{marginTop: 20, marginBottom:30}}>

                            <img style={{height:"20px", width:"20px"}} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="logo"/>
                            Sign In with Google
                            {/* <StyledFirebaseAuth
                            uiConfig={uiConfig}
                            firebaseAuth={firebase.auth()}

                            /> */}
                        </Button>
                    </Paper>
                </Container>
            );
        }
    }
}
function mapStateToProps (state) {
    // console.log(state)
    return {
        userdata: state.auth.user,
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}
export default withStyles (styles) (connect (mapStateToProps) (Login));