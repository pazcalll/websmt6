import {React, useState} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import MyItems from '../pages/MyItems';
import Button from 'react-bootstrap/button';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

function HomePage() {
  let list = [];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  for (let index1 = 0; index1 < 3; index1++) {
    var counter={
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
    list.push(
    <Col style={{marginBottom:"20px"}}>
      <div className="card" >
        <img src="https://www.duifhuizen.nl/media/wysiwyg/111208252-17147-001black-_1_-min.jpg" style={{maxHeight:"100px", maxWidth:"100px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">Leather Bag</h5>
          <p className="card-text">Description is here</p>
          <a href="#" className="btn btn-primary" variant="primary" onClick={handleShow}>+</a>
          <span style={{marginLeft:"15px"}}>Rp. 1111111</span>
        </div>
      </div>
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leather Bag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <img src="https://www.duifhuizen.nl/media/wysiwyg/111208252-17147-001black-_1_-min.jpg" style={{position:"relative", maxHeight:"225px", maxWidth:"225px", marginLeft:"25%", marginRight:"25%", marginTop:"10px", marginBottom:"10px"}} className="card-img-top" alt="..."/>
          <p>
            Desctiption is here
          </p>
        
        </Modal.Body>
        <Modal.Footer>
          <p style={{alignContent:"left"}}>Rp. 1111111</p>
          <div className="card">
            <div className="card-body counter" style={{marginTop:"0px"}}>
              <span id="item-count">
                1
              </span>
              <span className="card-body counter">
                <div className="btn-group">
                  <button className="btn btn-secondary btnCounter" id="btnPlus" onClick={() => counter.plus()}>+</button>
                  <button className="btn btn-secondary btnCounter" id="btnMinus" onClick={() => counter.minus()}>-</button>
                </div>
              </span>
            </div>
          </div>
          <Button variant="primary" onClick={MyItems}>
            Add to Items
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </Col>
    )
  }
  let list2 = [];
  for (let index = 0; index < 5; index++) {
    list2.push(
      <Row>
        {list}
      </Row>
    );
  }
  
  return (
    <div>
      {list2}
    </div>
  );
}
export default HomePage;