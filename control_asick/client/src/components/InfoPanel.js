import React, { useContext , useEffect} from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchServer } from "../http/serverAPI";


const InfoPanel = () =>{
    const {info} = useContext(Context)
    return(
        <ListGroup>
            <ListGroup.Item>Пользователь: {info.user.nikname}</ListGroup.Item>
            <ListGroup.Item>Почта: {info.user.email}</ListGroup.Item>
            <ListGroup.Item>Цена: {info.server.cost_object}$</ListGroup.Item>
            <ListGroup.Item>Заработок: {info.server.income}$</ListGroup.Item>
        </ListGroup>
    )
}

export default InfoPanel;