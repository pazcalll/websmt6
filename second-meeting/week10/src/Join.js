import React, {Component, useState, useContext} from "react";
import {AuthContext} from "./index";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Join = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const Auth = useContext(AuthContext);
    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccess: () => false
        }
      }

    // let googleClick = false;
    const handleForm = e =>{
        e.preventDefault();
        // console.log(Auth);
        // Auth.setLoggedIn(true);
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res=>{
            if(res.user) Auth.setLoggedIn(true);
        })
        .catch(e => {
            setError(e.message);
        })
    };

    function googleLogin() {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(res=>{
                console.log(res.user.email)
                Auth.setLoggedIn(true);
            })
            .catch(e=>{
                console.log(e)
            })
    }

    return(
        <div>
            <h1>Join</h1>
            <form onSubmit={e => handleForm(e)}>
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    placeholder="email" 
                    onChange={e=>setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    placeholder="password" 
                    onChange={e=>setPassword(e.target.value)}
                />
                <hr/>
                <button className="googleBtn" onClick={googleLogin}>
                    <img style={{height:"20px", width:"20px"}} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="logo"/>
                    Join with Google
                    {/* <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                        
                    /> */}
                </button>
                <br/>
                <button type="submit">Login</button>
                <span>{error}</span>
            </form>
        </div>
    );
}
export default Join;