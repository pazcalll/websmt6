import {React, useState, Component} from 'react';
import {connect} from 'react-redux'
import {addTodo} from '../Action/ActionCreator'
import {bindActionCreators} from 'redux'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from 'react-router-dom';
import $ from 'jquery';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import HomePost from './HomePost';

class MyItems extends Component{
    constructor(props){
        super(props);
        this.state={
            listProduk:[],
            listSell:[],
            show:false
        }
    }
    componentDidMount(){
        fetch('http://localhost:3002/keranjang')
          .then(response=>response.json())
          .then(apiData => {
            this.setState({
              listProduk: apiData
            })
            console.log(this.state.listProduk)
          })
      }
    
      componentDidMount2(){
        fetch('http://localhost:3001/produk')
        .then(response=>response.json())
        .then(apiData => {
            console.log(apiData)
          this.setState({
            listSell: apiData
          })
        })
      }

    

    handleDeleteProduk=(produkid)=>{
        fetch(`http://localhost:3002/keranjang/${produkid}`, {
            method:'DELETE', 
            header:{'Accept':'application.json', 'Content-Type':'application/json'}})
            .then(res => {
                this.componentDidMount()
            })
    }

    render(){
        let counter={
            count: [],
            cost: [],
            totalcost: 0,
            plus(produk){
                let costname=produk.id+"cost";
                if(this.count[produk.id] + 1 <= produk.stock){
                    this.count[produk.id] += 1;
                    let tmpcost = this.cost[costname]
                    this.cost[costname] = (tmpcost/(this.count[produk.id]-1)) * this.count[produk.id];
                    this.totalcost = this.totalcost+(this.cost[costname]-tmpcost)
                    // $("#item-count").text(this.count[produk.id]);
                    document.getElementById(produk.id).innerHTML=this.count[produk.id];
                    document.getElementById(costname).innerHTML="Rp. "+this.cost[costname];
                    document.getElementById("allIn").innerHTML="Cost Total: Rp. "+this.totalcost;
                }
                console.log(this.count);
                console.log(this.cost[costname]);
            },
            minus(produk){
                let costname=produk.id+"cost";
                
                console.log(this.count[produk.id]);
                console.log(this.cost[costname]);
                if(this.count[produk.id]-1==0){
                    
                }else{
                    this.count[produk.id] -= 1;
                    // $("#item-count").text(this.count[produk.id]);
                    let tmpcost = this.cost[costname]
                    this.cost[costname] = (tmpcost/(this.count[produk.id]+1)) * this.count[produk.id];
                    this.totalcost = this.totalcost - (tmpcost-this.cost[costname])
                    document.getElementById(produk.id).innerHTML=this.count[produk.id];
                    document.getElementById(costname).innerHTML="Rp. "+this.cost[costname];
                    document.getElementById("allIn").innerHTML="Cost Total: Rp. "+this.totalcost;
                    console.log("cost ",this.cost[costname]);
                    console.log("tmpcost ",tmpcost);
                }
            }
        };
        let content = this.state.listProduk.map(produk => {
            counter.count[produk.id]=1;
            counter.cost[produk.id+"cost"]=produk.price;
            counter.totalcost=parseInt(counter.totalcost)+parseInt(produk.price);
            return(

                // <div>
                    
                    <Col style={{marginBottom:"20px"}} key={produk.id}>
                        <div className="card" style={{width:"300px", maxWidth:"300px"}}>
                            <button className="btn btn-danger" style={{marginLeft:"10px", marginTop:"5px", maxWidth:"30px", padding:"1px"}} onClick={()=>this.handleDeleteProduk(produk.id)}>X</button>
                            <img src={produk.img} style={{maxHeight:"100px", maxWidth:"100px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{produk.name}</h5>
                                <p className="card-text">{produk.desc}</p>
                                <span id={produk.id}>
                                    {counter.count[produk.id]}
                                </span>
                                <span className="card-body counter">
                                    <div className="btn-group">
                                    <button className="btn btn-secondary btnCounter" id="btnPlus" onClick={() => counter.plus(produk)}>+</button>
                                    <button className="btn btn-secondary btnCounter" id="btnMinus" onClick={() => counter.minus(produk)}>-</button>
                                    </div>
                                </span>
                                <span id={produk.id+"cost"} style={{marginLeft:"15px"}}>Rp. {produk.price*counter.count[produk.id]}</span>
                            </div>
                        </div>
                    </Col>
                // </div>
            );
        })
        const HideClick = () => {
            this.setState({show:!this.state.show});
            var allIn = counter.totalcost;
            document.getElementById('allIn').innerHTML="Cost Total: Rp. 0";
            document.getElementById('checkout').visibility="hidden"
        }
        const updateProduk=(produk,count)=>{
            const id = produk.itemId;
            const name = produk.name;
            const desc = produk.desc;
            const price = produk.price;
            const img = produk.img;
            const stock = produk.stock-count;
            let produktmp={...this.state.listSell};
            produktmp['id'] = id;
            produktmp['name'] = name;
            produktmp['desc'] = desc;
            produktmp['price'] = price;
            produktmp['img'] = img;
            produktmp['stock'] = stock;
            console.log(produktmp)
            // fetch(`http://localhost:3001/produk/${id}`, {
            //     method:'put', 
            //     header:{
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json' 
            //     },
            //     body:JSON.stringify(produktmp)
            // })
        }
        const BulkDelete =()=>{
            this.state.listProduk.map(produk => {
                updateProduk(produk, counter.count[produk.id])
                fetch(`http://localhost:3002/keranjang/${produk.id}`, {
                method:'DELETE', 
                header:{'Accept':'application.json', 'Content-Type':'application/json'}})
                .then(res => {
                    this.componentDidMount()
                })
            });
            document.getElementById('allIn').innerHTML="Cost Total: Rp. 0";
            alert("All items are checked out")
        }

        return(
            <div  id="checkout">
                <div onClick={HideClick}>
                    <Router>

                        <Link to="/"><a show="false" onClick={BulkDelete} className="btn btn-primary" style={{marginLeft:"20px", marginBottom:"20px"}}>CHECK OUT </a></Link>
                        <span id="allIn" style={{margin:"15px", fontSize:"20pt"}}>Cost Total: Rp. {counter.totalcost}</span>
                        {/* <Switch>
                            <Route path="/">
                                <HomePost listProduk={this.state.listSell}/>
                            </Route>
                        </Switch> */}
                    </Router>
                </div>
                <Row>
                    {content}            
                </Row>
            </div>
        );
    }
}
export default MyItems;