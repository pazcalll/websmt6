import React, {
    Component
} from "react";
import { connect} from "react-redux";
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
// import API from '../../Services/index';
import Post from "../BlogPost/Post";
import History from './History';
import MyItems from "./MyItems";
import Account from "./Account";
import { logoutUser} from "../../actions/auth"; 
import firebase from "firebase";
// import 'firebase/firestore';
import logo from '../.././logo.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import '../.././index.css';
import '../.././App.css';
import './BlogPost.css';
import firebaseConfig from "../../firebase/config";

class BlogPost extends Component{
    constructor(props){
        super(props);
        if(!firebase.apps.length){ firebase.initializeApp(firebaseConfig) } 
        this.state={
            history:[],
            produk:[],
            keranjang:[]
        }
    }

    ambilDataDariServerAPI = () => {
        let ref = firebase.database().ref("/");
        ref.on("value", snapshot=>{
            const state = snapshot.val();
            this.setState(state);
        });
        console.log(this.state);
    }

    simpanDataKeServerAPI = () => {
        firebase.database().
            ref("/")
            .set(this.state);
    }

    componentDidMount(){            //komponen untuk mengecek ketika component telah di-mount-lng, maka panggil API
        this.ambilDataDariServerAPI()
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState !== this.state) {
            this.simpanDataKeServerAPI();
        }
    }

    deleteAll = () => {
        const {keranjang} = this.state;
        const newState = []
        this.setState({keranjang: []});
    }

    deleteItem = (id) => {        //fungsi yang menghandle button action hapus data
        const {keranjang} = this.state;
        const newState = keranjang.filter(data => {
            return data.id !== id;
        });
        this.setState({keranjang: newState});
    }

    handleLogout = () => {
        const { dispatch} = this.props; 
        dispatch(logoutUser ());
    };

    HistoryItem = (property) => {
        let date = new Date();
        let id = date.getFullYear() + '' + date.getMonth() + '' + date.getDay() + '' + date.getSeconds() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getMilliseconds();
        let totalprice = property.totalprice;
        let img = property.img;
        let itemname = property.itemname;
        let amount = property.amount;
        let eachprice = property.eachprice;
        const {history} = this.state;
        history.push({id, totalprice, img, itemname, amount, eachprice});
        // const newState = history.filter(data => {
        //     return data.id !== property.id;
        // });
        this.setState({history});
    }

    ToggleClick = (produk) => {
        let id = produk.id;
        let name = produk.name;
        let desc = produk.desc;
        let stock = produk.stock;
        let img = produk.img;
        let price = produk.price;
        let {keranjang} = this.state;
        keranjang.push({desc, id, img, name, price, stock});
        // let indexing = keranjang.findIndex(data => {
        //     console.log(data);
        //     return data.id === id;
        // })
        this.setState({keranjang});

    }
    
    render(){
        let fakeAuth ={
            isAuthenticated: false,
            authenticate(cb){
              fakeAuth.isAuthenticated = true;
              console.log(this.isAuthenticated)
              setTimeout(cb, 100);
            },
            signout(cb){
              fakeAuth.isAuthenticated = false;
              setTimeout(cb, 100);
            }
        };
        function home(){
            $( "#history" ).hide();
            $( "#account" ).hide();
            $( "#my-items" ).hide();
            $("#primary-content").fadeIn("fast");
        }
        function handleClick() {
            $(document).ready(function(){
                $( "#primary-content" ).hide();
                $( "#history" ).hide();
                $( "#account" ).hide();
                $( "#my-items" ).fadeIn(500);
            })
            // $( "#my-items" ).fadeIn( "slow");
            // $( "#primary-content" ).hide();
            // $( "#history" ).hide();
            // $( "#account" ).hide();
        }
        function toHistory(){
            $( "#primary-content" ).hide();
            $( "#my-items" ).hide();
            $( "#account" ).hide();
            $( "#history" ).fadeIn(500);
        }
        function toAccount(){
            $( "#primary-content" ).hide();
            $( "#my-items" ).hide();
            $( "#history" ).hide();
            $( "#account" ).fadeIn(500);
        }
        function AuthButton(){
            let location = useLocation();
            let history = useHistory();
            if (fakeAuth.isAuthenticated==true) {
                return (
                  $("#drop").fadeOut(),
                  <p style={{marginLeft:"85%", marginTop:"10px"}}>
                    <button className="btn btn-primary" style={{marginLeft:"100px"}} onClick={() => {
                      fakeAuth.signout(() => history.push("/"));
                      $("#drop").fadeIn();
                      $("#primary-content").fadeIn("fast");
                    }}>
                      Sign Out
                    </button>
                  </p>
                );
            }else{
              
                let { from } = location.state || { from: { pathname:"/" } };
                let login = () => {
                  fakeAuth.authenticate(() => {
                    history.replace(from);
                  });
                  
                };
                return (
                  <div>
                    <p>You Must log in to to proceed</p>
                    <button onClick={login}>Log in</button>
                  </div>
                );
            }
          }
        
        return(
            <Router>
                <div className="central">
                    <div className="sidebar bg-dark">
                        {/* <div className="items"> */}
                        <ul>
                            <li><Link className="side-item" onClick={home} to="/">Home</Link></li>
                            <li><Link className="side-item" onClick={handleClick} to="/items">My Items</Link></li>
                            <li><Link className="side-item" onClick={toHistory} to="/history">History</Link></li>
                            <li><Link className="side-item" onClick={()=>{toAccount()}} to="/account">Account</Link></li>
                        </ul>
                        {/* </div> */}
                    </div>
                    <div className="responsive-nav" style={{position: 'sticky', top:'0', display:"block", height:'100%', maxHeight:'100px', marginTop: 'auto', zIndex: '2'}}>
                    
                        <nav className="navbar navbar-dark bg-secondary" style={{alignContent:'center', maxHeight:'100px', width: '100%',height:'100%', position: 'relative', marginTop:'0px'}}>
                            <a className="navbar-brand" href="#">
                                <img src={logo} width="50" height="50" alt="" className="App-logo "/> MyOnlineShop
                            </a>
                            {/* <form> */}
                                <button onClick={this.handleLogout} className="btn btn-dark logout" style={{border:"none"}}>Logout</button>
                            {/* </form> */}
                        </nav>
                    </div>
                        <AuthButton/>  
                    <div className="container">
                        <div id="primary-content">
                            <div>
                                <Row className="produk-list" style={{maxWidth:"1250px", marginBottom:"60px"}}>
                                    <h1 style={{marginLeft:"100px"}}>Products</h1>
                                    {/* <h1 style={{marginLeft:"100px"}}>Items</h1> */}
                                    {   
                                        this.state.produk.map(produk => {
                                            return <Post key={produk.id} save={this.ToggleClick} newProduk={produk}/>
                                        })
                                    }
                                </Row>
                            </div>
                        </div>
                        <div id="my-items" className="produk-list" style={{display:"none"}}>
                                <Row>
                                    <span>
                                        <h1 style={{marginLeft:"100px"}}>My Items</h1>
                                    </span>
                                    {
                                        // this.state.keranjang.map(produk => {
                                        //     return <MyItems key={produk.id} newProduk={produk} delete={this.deleteItem}/>
                                        // })
                                    }
                                    <MyItems newProduk={this.state} delete={this.deleteItem} checkout={this.HistoryItem} deleteAll={this.deleteAll}/>
                                </Row>
                        </div>
                        <div id="history" style={{display:"none", maxWidth: "1000px", width:"100%"}}>
                            <History history={this.state}/>
                        </div>
                        <div id="account" style={{display:"none"}}>
                            <Account account="myAccount"/>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}
function mapStateToProps (state) {
    console.log(state)
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError
    };
} 
export default connect (mapStateToProps) (BlogPost);
// export default BlogPost;