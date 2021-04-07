import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserPage() {
    return (
        <div className="container" style={{marginLeft:"30%", marginRight:"20%"}}>
            <h1>About the Maker</h1>
            <img src="https://media-exp1.licdn.com/dms/image/C5603AQF2qnwJ8sLItg/profile-displayphoto-shrink_200_200/0/1568630008318?e=1621468800&v=beta&t=km4CHDBwWkBToAC0kvrRcG0lgcxTE28y3O-DKS8TUVQ" style={{width:"300px", height:"300px"}} alt="asd"/>
            <table style={{width:"400px", fontSize:"13pt", marginTop:"10px"}}>
                <thead>
                
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td style={{marginLeft:"20px"}}>Yazeed Qholili Arifin</td>
                    </tr>
                    <tr>
                        <td>Class</td>
                        <td style={{marginLeft:"20px"}}>TI-3G</td>
                    </tr>
                    <tr>
                        <td>Student ID</td>
                        <td style={{marginLeft:"20px"}}>1841720045</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}