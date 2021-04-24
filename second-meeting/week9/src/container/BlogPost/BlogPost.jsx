import React, {Component} from "react";
import './BlogPost.css';
import API from '../../Services/index';
import Post from "../BlogPost/Post";

class BlogPost extends Component{
    state = {                       // komponen state dari React untuk statefull component
        listArtikel: [],             // variabel array yang digunakan untuk menyimpan data API
        insertArtikel: {
            userId: 1,
            id: 1,
            title: "",
            body: ""
        }
    }
    ambilDataDariServerAPI = () => {
        API.getNewsBlog().then(result => {
            this.setState({
                listArtikel: result
            })
        })
    }

    componentDidMount(){            //komponen untuk mengecek ketika component telah di-mount-lng, maka panggil API
        fetch('https://jsonplaceholder.typicode.com/posts') //alamat URL API yang ingin kita ambil datanya
            .then(response => response.json())              // ubah response data dari URL API menjadi sebuah data json
            .then(jsonHasilAmbilDariAPI => {                // data json hasil ambil dari API kita masukkan ke dalam listArtikel pada state
                this.setState({
                    listArtikel: jsonHasilAmbilDariAPI
                })
            })
        this.ambilDataDariServerAPI()
    }

    handleHapusArtikel = (data) => {        //fungsi yang menghandle button action hapus data
        API.deleteNewsBlog(data);
            this.ambilDataDariServerAPI();
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

    handleTombolSimpan =() => {
        API.postNewsBlog(this.state.insertArtikel)
        .then((response)=>{
            this.ambilDataDariServerAPI();
        });
    }

    render(){
        return(
            <div className="post-artikel">
                <div className="form pb-2 border-button">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Judul</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" name="title" onChange={this.handleTambahArtikel}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="body" className="col-sm-2 col-form-label">Isi</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" name="body" id="body" rows="3" onChange={this.handleTambahArtikel}></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
                <h2>Daftar Artikel</h2>
                {
                    this.state.listArtikel.map(artikel => { //looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
                        return <Post key={artikel.id} judul={artikel.title} isi = {artikel.body} idArtikel={artikel.id} hapusArtikel={this.handleHapusArtikel}/>   // mappingkan data json dari API sesuai dengan kategorinya
                    })
                }
            </div>
        )
    }
}

export default BlogPost;