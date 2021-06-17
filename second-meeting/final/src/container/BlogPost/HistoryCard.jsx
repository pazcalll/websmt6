import React from 'react';

const HistoryCard = (props) =>{
    // console.log(props.history.history);
    let i = 0;
    let itemname = [];
    let eachprice = [];
    let img = [];
    let amount = [];
    return(
        <div>
            {
                props.history.history.map(buyhistory =>{
                    i = 0
                    return(
                        <div>
                            <div className="card" style={{ minWidth:"1000px", width:'100%', marginBottom:'40px', marginTop:'20px'}}>
                                <h4 className="card-header">Transaction ID : {buyhistory.id}</h4>
                                    {
                                        buyhistory.amount.map(singlehistory =>{
                                            itemname = buyhistory.itemname
                                            eachprice = buyhistory.eachprice;
                                            img = buyhistory.img;
                                            amount = buyhistory.amount;
                                            // console.log(itemname)
                                            return(
                                                <div>
                                                    <div className="flexcard">
                                                        <img src={img[i]} style={{maxHeight:"140px", maxWidth:"160px", marginLeft:"10px", marginTop:"10px", marginBottom:"10px"}} className="card-img-top" alt="..."/>
                                                        <div style={{display: 'block', alignSelf:"center"}}>
                                                            <h5 className="card-title">{itemname[i]} ({parseInt(amount[i])} * {parseInt(eachprice[i])})</h5>
                                                            {/* <div className="card-body" style={{maxWidth:"100"}}>
                                                                <p className="card-text">asdadasdasdadasdasdasasdasdasqwreqe qwrqwr qweasfasdt w</p>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                    <div style={{display:"none"}}>
                                                        {i = i + 1}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                <div className="card-footer text-muted text-right">
                                    <h4 >Total : Rp. {buyhistory.totalprice}</h4>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default HistoryCard;