import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase from 'firebase';

const Account = (props) => {
    let user = firebase.auth().currentUser;
    console.log(user)
    return(
        <div style={{marginLeft:"150px"}}>
            <h1>Account</h1>
            <div className="card" style={{maxWidth:"640px", marginTop:"50px"}}>
                <div className="flexcard" style={{padding:"30px"}}>
                    <img src={user.photoURL} alt="user img" style={{borderRadius:"100%", maxHeight:"150px", width:"150px"}} />
                    <table style={{marginLeft:"20px", fontSize:"14pt"}}>
                        <tbody>
                            <td>Name</td>
                            <td style={{paddingLeft:"50px"}}>: {user.displayName}</td>
                        </tbody>
                        <tbody>
                            <td>Email</td>
                            <td style={{paddingLeft:"50px"}}>: {user.email}</td>
                        </tbody>
                        <tbody>
                            <td>Verification</td>
                            <td style={{paddingLeft:"50px"}}>: {user.emailVerified ? ("True"):("False")}</td>
                        </tbody>
                        <tbody>
                            <td>Phone Number</td>
                            <td style={{paddingLeft:"50px"}}>: {user.phone ? (user.phone):("None")}</td>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Account;