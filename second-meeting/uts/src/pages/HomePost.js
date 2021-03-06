import {React, useState, Component} from "react";
import Modal from 'react-bootstrap/Modal';
import MyItems from '../pages/MyItems';
import Button from 'react-bootstrap/Button';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class HomePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            // clicks:0,
            // show:false
            insertProduk:{
            }
        }
    }
    newProduk=[]
    count=-1;

    render(){
        // const IncrementItem = () =>{
        //     this.setState({clicks:this.state.clicks+1});
        // }
        // const DecreaseItem = () => {
        //     this.setState({clicks:this.state.clicks-1});
        // }
        const ToggleClick = (newProp) => {
            // this.setState({show:!this.state.show});
            let formInsertProduk = {...this.state.insertProduk};
            let timestamp = new Date().getTime();
            formInsertProduk['id'] = timestamp;
            formInsertProduk['itemId'] = newProp.id;
            formInsertProduk['name'] = newProp.name;
            formInsertProduk['desc'] = newProp.desc;
            formInsertProduk['price'] = newProp.price;
            formInsertProduk['img'] = newProp.img;
            formInsertProduk['stock'] = newProp.stock;
            // this.setState({
            //     insertProduk: formInsertProduk
            // });
            addToCart(formInsertProduk);
            console.log(formInsertProduk)
            alert(formInsertProduk.name+" added to cart");
        }
        const addToCart = (formInsertProduk) => {
            fetch('http://localhost:3002/keranjang', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(formInsertProduk)
            })
                // .then((Response)=>{
                //     this.ambilDataDariServerAPI();
                // });
        }
        // const HideClick = () => {
        //     this.setState({show:!this.state.show});
        // }
        // const BuyPage = () => {
            
        // }
        const {listProduk} = this.props;
        const produks = listProduk.map(produk => {
            this.newProduk.push(produk)
            this.count=this.count+1
            return(
                <Col style={{marginBottom:"20px", minWidth:"300px"}} key={this.newProduk[this.count].id}>
                    <div className="card" style={{minWidth:"500"}}>
                            <img src={this.newProduk[this.count].img} style={{maxHeight:"100px", maxWidth:"100px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}} className="card-img-top" alt="..."/>
                        <div className="card-body" style={{maxWidth:"100"}}>
                            <h5 className="card-title">{this.newProduk[this.count].name}</h5>
                            <p className="card-text">{this.newProduk[this.count].desc}</p>
                            <a href="#" className="btn btn-primary" variant="primary" onClick={()=>ToggleClick(produk)}>+</a>
                            <span style={{marginLeft:"15px"}}>Rp. {this.newProduk[this.count].price}</span>
                            <span style={{marginLeft:"25px", color:"gray"}}>Sisa: {this.newProduk[this.count].stock}</span>
                        </div>
                    </div>

                    {/* {this.state.show ? 
                    
                    <>
                        <Modal show={this.state.show} onHide={HideClick}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.newProduk[this.count].name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            
                                <img src={this.newProduk[this.count].img} style={{position:"relative", maxHeight:"225px", maxWidth:"225px", marginLeft:"25%", marginRight:"25%", marginTop:"10px", marginBottom:"10px"}} className="card-img-top" alt="..."/>
                                <p>
                                {this.newProduk[this.count].desc}
                                </p>
                            
                            </Modal.Body>
                            <Modal.Footer>
                                <p style={{alignContent:"left"}}>{(this.state.clicks*this.newProduk[this.count].price)}</p>
                                <div className="card">
                                <div className="card-body counter" style={{marginTop:"0px"}}>
                                    <span id="item-count">
                                        {this.state.clicks}
                                    </span>
                                    <span className="card-body counter">
                                    <div className="btn-group">
                                        <button className="btn btn-secondary btnCounter" id="btnPlus" onClick={IncrementItem}>+</button>
                                        <button className="btn btn-secondary btnCounter" id="btnMinus" onClick={DecreaseItem}>-</button>
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
                    : ''} */}
                </Col>
            );
        })
        return(
            <Row className="produk-list" style={{maxWidth:"1250px"}}>
                {produks}
            </Row>
        )
    }
}
export default HomePost;