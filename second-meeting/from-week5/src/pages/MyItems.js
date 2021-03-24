import {React, useState} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/button';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

export default function MyItems(){
    let counter={
        count: 1,
        plus(){
          this.count += 1;
          $("#item-count").text(this.count);
          console.log(this.count);
        },
        minus(){
          this.count -= 1;
          $("#item-count").text(this.count);
          console.log(this.count);
        }
      };
    return(
        <div>
            <a className="btn btn-primary" style={{marginLeft:"20px", marginBottom:"20px"}}>CHECK OUT</a>
            <Col style={{marginBottom:"20px"}}>
                <div className="card" style={{maxWidth:"200px"}}>
                    <img src="https://www.duifhuizen.nl/media/wysiwyg/111208252-17147-001black-_1_-min.jpg" style={{maxHeight:"100px", maxWidth:"100px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Leather Bag</h5>
                        <p className="card-text">Description is here</p>
                        <span id="item-count">
                            1
                        </span>
                        <span className="card-body counter">
                            <div className="btn-group">
                            <button className="btn btn-secondary btnCounter" id="btnPlus" onClick={() => counter.plus()}>+</button>
                            <button className="btn btn-secondary btnCounter" id="btnMinus" onClick={() => counter.minus()}>-</button>
                            </div>
                        </span>
                        <span style={{marginLeft:"15px"}}>Rp. 1111111</span>
                    </div>
                </div>
            </Col>
        </div>
        
        );
}