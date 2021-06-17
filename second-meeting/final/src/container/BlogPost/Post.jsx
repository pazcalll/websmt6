import React from "react";

const Post = (props) => {
    // console.log(props.newProduk);
    return(
        <div className="card" style={{left: '100px', minWidth:"950px", width:'100%', marginBottom:'10px',marginTop:"20px"}}>
            <div className="flexcard">
                <img src={props.newProduk.img} style={{maxHeight:"140px", maxWidth:"160px", marginLeft:"10px", marginTop:"10px", marginBottom:"10px"}} className="card-img-top" alt="..."/>
                <div style={{display: 'block'}}>
                    <h5 className="card-title">{props.newProduk.name}</h5>
                    <div className="card-body" style={{maxWidth:"100"}}>
                        <p className="card-text">{props.newProduk.desc}</p>
                    </div>
                </div>
                <div style={{width: '200px', marginLeft: 'auto', alignSelf: 'center'}}>
                    <a style={{maxHeight: '40px'}} className="btn btn-success" onClick={()=> {window.alert(props.newProduk.name+" has been added"); props.save(props.newProduk)}}>+</a>
                    <span style={{marginLeft:"15px"}}>Rp. {props.newProduk.price}</span>
                    {/* <span style={{marginLeft:"25px", color:"gray"}}>Sisa: {props.newProduk.stock}</span> */}
                </div>
            </div>
        </div>
    )
}
export default Post;