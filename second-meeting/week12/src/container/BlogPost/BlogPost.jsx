import React, {Component} from "react";
import './BlogPost.css';
// import API from '../../Services/index';
import Post from "../BlogPost/Post";
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "firebase";
import 'firebase/firestore';
import firebaseConfig from "../../firebase/config";

class BlogPost extends Component{
    constructor(props){
        super(props);
        if(!firebase.apps.length){ firebase.initializeApp(firebaseConfig) } 
        this.state={
            listArtikel: []
        }
    }
    ambilDataDariServerAPI = () => {
        let ref = firebase.database().ref("/");
        ref.on("value", snapshot=>{
            const state = snapshot.val();
            this.setState(state);
        });
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

    handleHapusArtikel = (idArtikel) => {        //fungsi yang menghandle button action hapus data
        const {listArtikel} = this.state;
        const newState = listArtikel.filter(data => {
            return data.uid !== idArtikel;
        });
        this.setState({listArtikel: newState});
    }

    handleTambahArtikel =(event) => {
        let formInsetArtikel = {...this.state.insertArtikel};
        let timestamp = new Date().getTime();
        formInsetArtikel['id'] = timestamp;
        formInsetArtikel[event.target.name] =event.target.value;
        this.setState({
            insertArtikel: formInsetArtikel
        });
    }

    handleTombolSimpan = (event) => {
        let title = this.refs.judulArtikel.value;
        let body = this.refs.isiArtikel.value;
        let uid = this.refs.uid.value;

        if (uid && title && body) {
            const {listArtikel} = this.state;
            const indeksArtikel = listArtikel.findIndex(data => {
                return data.uid === uid;
            })
            listArtikel[indeksArtikel].title = title;
            listArtikel[indeksArtikel].body = body;
            this.setState({listArtikel});
        }else if(title && body){
            const uid = new Date().getTime().toString();
            const {listArtikel} = this.state;
            listArtikel.push({uid, title, body});
            this.setState({listArtikel});
        }
        this.refs.judulArtikel.value="";
        this.refs.isiArtikel.value="";
        this.refs.uid.value="";
    }

    render(){
        return(
            <div className="post-artikel">
                <div className="form pb-2 border-button">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Judul</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" name="title" ref="judulArtikel"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="body" className="col-sm-2 col-form-label">Isi</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" name="body" id="body" rows="3" ref="isiArtikel"></textarea>
                        </div>
                    </div>
                    <input type="hidden" name="uid" ref="uid"/>
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
                <h2>Daftar Artikel</h2>
                {
                    this.state.listArtikel.map(artikel => { //looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
                        return <Post key={artikel.uid} judul={artikel.title} isi = {artikel.body} 
                            idArtikel={artikel.uid} hapusArtikel={this.handleHapusArtikel}/>   // mappingkan data json dari API sesuai dengan kategorinya
                    })
                }
            </div>
        )
    }
}

export default BlogPost;