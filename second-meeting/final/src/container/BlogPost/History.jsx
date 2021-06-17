import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HistoryCard from './HistoryCard';

const History = (props) => {
    // console.log(props.newProduk);
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' => ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ':' + today.getMilliseconds();
    return(
        <Row style={{marginLeft:"150px"}}>
            <h1>History</h1>
            <HistoryCard date={date} history={props.history}/>
        </Row>
    )
}
export default History;