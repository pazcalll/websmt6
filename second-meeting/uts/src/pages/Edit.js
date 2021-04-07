import {React, useState, Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

class Edit extends Component{
    constructor(props){
        super(props);
        this.state={
            listProduk:[]
        }
    }
    componentDidMount(){
        fetch('http://localhost:3001/produk')
            .then(response=>response.json())
            .then(apiData => {
                this.setState({
                    listProduk: apiData
                })
        })
    }
    updateProduk=(produk,count)=>{
        const id = produk.itemId;
        const name = produk.name;
        const desc = produk.desc;
        const price = produk.price;
        const img = produk.img;
        const stock = toString(produk.stock-count);
        let produktmp={...this.state.listSell};
        produktmp['id'] = id;
        produktmp['name'] = name;
        produktmp['desc'] = desc;
        produktmp['price'] = price;
        produktmp['img'] = img;
        produktmp['stock'] = stock;
        console.log(produktmp)
        fetch('http://localhost:3001/produk/'+id, {
            method:'PUT', 
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body:JSON.stringify(produktmp['stock'])
        })
            .then(res => {
                this.componentDidMount2()
            })
    }
}
export default Edit;