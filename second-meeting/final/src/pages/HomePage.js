import {React, useState, Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import produk from './listProduk.json'
import HomePost from './HomePost';
import 'bootstrap/dist/css/bootstrap.min.css';


class HomePage extends Component{
  state = {
    listProduk: []
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
  render() {
    return(
      <div className="zzz">
        {/* {this.state.listProduk.map(produk => {
          return <HomePost listProduks={produk}/>
        })} */}
        <HomePost listProduk={this.state.listProduk}/>
      </div>
    );
  }
  
}
export default HomePage;