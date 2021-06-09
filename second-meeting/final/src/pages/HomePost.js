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
        }
        const {listProduk} = this.props;
        const produks = listProduk.map(produk => {
            this.newProduk.push(produk)
            this.count=this.count+1
            return(
                    <div className="card" style={{marginLeft: '20px', minWidth:"1100px", width:'100%', marginBottom:'10px'}}>
                        <div className="flexcard">
                            <img src={this.newProduk[this.count].img} style={{maxHeight:"200px", maxWidth:"200px", marginLeft:"10px", marginTop:"10px", marginBottom:"10px"}} className="card-img-top" alt="..."/>
                            <div style={{display: 'block'}}>
                                <h5 className="card-title">{this.newProduk[this.count].name}</h5>
                                <div className="card-body" style={{maxWidth:"100"}}>
                                    <p className="card-text">{this.newProduk[this.count].desc}</p>
                                </div>
                            </div>
                            <div style={{width: '250px', marginLeft: 'auto', alignSelf: 'center'}}>
                                <a href="#" style={{maxHeight: '40px'}} className="btn btn-primary" variant="primary" onClick={()=>ToggleClick(produk)}>+</a>
                                <span style={{marginLeft:"15px"}}>Rp. {this.newProduk[this.count].price}</span>
                                <span style={{marginLeft:"25px", color:"gray"}}>Sisa: {this.newProduk[this.count].stock}</span>
                            </div>
                        </div>
                    </div>
                // <Col style={{marginBottom:"20px", minWidth:"300px", position:"relative"}} key={this.newProduk[this.count].id}>

                // </Col>
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