import React from "react";
import ReactDOM from 'react-dom';

const MyItems = (props) => {
    // console.log(props.newProduk.keranjang)
    let number = 1;
    let total = 0;
    let img = [];
    let itemname = [];
    let numbers = [];
    let eachprice = [];
    let allId = [];
    const allprices = (price, operation) => {
        if(operation == "increment") total = total + parseInt(price);
        else total = total - parseInt(price);

        ReactDOM.render(total, document.getElementById("total"));
    }
    const incremental = (produk) => {
        let price = parseInt(document.getElementById(produk.id+"price").innerHTML);
        number = parseInt(document.getElementById(produk.id+"number").innerHTML);
        console.log(price);
        if(number < 10){
            number = number+1;
            allprices(parseInt(produk.price), "increment")
            price = price + parseInt(produk.price);
            ReactDOM.render(number, document.getElementById(produk.id+"number"));
            ReactDOM.render(price, document.getElementById(produk.id+"price"));
        }
    }
    const decremental = (produk) => {
        let price = parseInt(document.getElementById(produk.id+"price").innerHTML);
        number = parseInt(document.getElementById(produk.id+"number").innerHTML);
        console.log(produk.price);
        if(number-1 > 0){
            number = number-1;
            allprices(parseInt(produk.price), "decrement")
            price = price - parseInt(produk.price);
            ReactDOM.render(number, document.getElementById(produk.id+"number"));
            ReactDOM.render(price, document.getElementById(produk.id+"price"));
        }
    }
    const getnumbers = () => {
        props.newProduk.keranjang.map(produk => {
            numbers.push(parseInt(document.getElementById(produk.id+"number").innerHTML));
        })
    }
    {
        props.newProduk.keranjang.map(produk => {
            total = total + parseInt(produk.price);
            img.push(produk.img);
            itemname.push(produk.name);
            eachprice.push(parseInt(produk.price));
        })
    }
    return(
        <div>
            
            <a onClick={() => {
                if(window.confirm("Are you sure to checkout? "+total+" will be used")){
                    getnumbers()
                    props.checkout({totalprice: total, img: img, itemname: itemname, amount: numbers, eachprice: eachprice})
                    // allId.map(id => {
                    //     console.log(id)
                    //     props.delete(id)
                    // })
                    props.deleteAll()
                }

                }} className='btn btn-success' style={{marginRight:'20px', marginLeft:"150px"}}>
                    CHECKOUT
            </a>
            <span className="btn disabled" style={{fontSize:"18pt", fontWeight:"bold"}}>Total : <span id={"total"}>{total}</span></span>
            {
                props.newProduk.keranjang.map(produk => {
                    console.log(produk.id)
                    allId.push(produk.id)
                    return (
                        <div className="card" style={{left: '100px', minWidth:"1000px", width:'100%', marginBottom:'10px', marginTop:"20px"}}>
                            <div className="flexcard">
                                <img src={produk.img} style={{maxHeight:"140px", maxWidth:"160px", marginLeft:"10px", marginTop:"10px", marginBottom:"10px"}} className="card-img-top" alt="..."/>
                                <div style={{display: 'block'}}>
                                    <h5 className="card-title">{produk.name}</h5>
                                    <div className="card-body" style={{maxWidth:"100"}}>
                                        <p className="card-text">{produk.desc}</p>
                                    </div>
                                </div>
                                <div style={{width: '250px', marginLeft: 'auto', alignSelf: 'center'}}>
                                    <span class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <a className="btn btn-success" onClick={()=>incremental(produk)}>+</a>
                                        <label class="btn btn-success">
                                            <span className="inputbox" style={{color:"black", borderRadius:"10px", paddingBottom:"3px", paddingTop:"3px", paddingLeft:"15px", paddingRight:"15px", backgroundColor:"#e3e3e3", alignSelf:"center"}}><span id={produk.id+"number"} >{number}</span></span>
                                        </label>
                                        <a className="btn btn-success" onClick={()=>decremental(produk)}>-</a>
                                    </span><br />
                                    <span style={{fontSize:'12pt'}} >Rp. <span id={produk.id+"price"}>{produk.price}</span></span>
                                    {/* <span style={{marginLeft:"25px", color:"gray"}}>Sisa: {produk.stock}</span> */}
                                </div>
                                <a class=" btn btn-danger " aria-label="Close" onClick={() => {if (window.confirm('Apakah anda yakin menghapus barang ini dari daftar?')) props.delete(produk.id);}} 
                                    style={{boxShadow:" 0 0 16px rgba(0, 0, 0, 0.5)", borderRadius:"0px", paddingRight:"10px", paddingLeft:"10px", padding:"5px", maxHeight:"40px", marginRight:"20px", marginTop:"10px"}}>
                                    <span aria-hidden="true"><b>&times;</b></span>
                                </a>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
    
    // // console.log(props.newProduk);
    // return(
        
    // )
}
export default MyItems;