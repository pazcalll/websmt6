import React, {Component} from "react";
import './BlogPost.css';
import Post from "../BlogPost/Post";

class BlogPost extends Component{
    state = {                       // komponen state dari React untuk statefull component
        listArtikel: []             // variabel array yang digunakan untuk menyimpan data API
    }
    componentDidMount(){            //komponen untuk mengecek ketika component telah di-mount-lng, maka panggil API
        fetch('https://jsonplaceholder.typicode.com/posts') //alamat URL API yang ingin kita ambil datanya
            .then(response => response.json())              // ubah response data dari URL API menjadi sebuah data json
            .then(jsonHasilAmbilDariAPI => {                // data json hasil ambil dari API kita masukkan ke dalam listArtikel pada state
                this.setState({
                    listArtikel: jsonHasilAmbilDariAPI
                })
            })
    }
    render(){
        return(
            <div className="post-artikel">
                <h2>Daftar Artikel</h2>
                {
                    this.state.listArtikel.map(artikel => { //looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
                        return <Post key={artikel.id} judul={artikel.title} isi = {artikel.body}/>   // mappingkan data json dari API sesuai dengan kategorinya
                    })
                }
            </div>
        )
    }
}

export default BlogPost;