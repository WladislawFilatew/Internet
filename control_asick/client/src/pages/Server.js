import React, {useContext, useEffect} from "react";
import {Container, Row, Col, Card} from 'react-bootstrap'
import InfoPanel from '../components/InfoPanel'
import MainersPanel from "../components/MainersPanel";
import { fetchMainers } from "../http/mainerAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchUslov } from "../http/uslovAPI";
import { fetchServer } from "../http/serverAPI";
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchUser } from "../http/userAPI";



const Server = observer(() => {
    const {user, info} = useContext(Context)
    
    useEffect(()=>{
        fetchUser(user.id).then(data => {
            info.setUser(data)
            fetchServer(data.serverId).then(data => {
                info.setServer(data)
                fetchUslov(data.uslovId).then(data => info.setUslov(data))
            })
            fetchMainers(data.serverId).then(data => info.setMainers(data))
        })
    }, [])
    
    return (
        <Container>
            <Row className="mt-2"> 
                <Col md = {3}>
                    <ListGroup>
                        <ListGroup.Item>Пользователь: {info.user.nikname}</ListGroup.Item>
                        <ListGroup.Item>Почта: {info.user.email}</ListGroup.Item>
                        <ListGroup.Item>Цена: {info.server.cost_object}$</ListGroup.Item>
                        <ListGroup.Item>Заработок: {info.server.income}$</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md = {9}>
                    <MainersPanel/>
                </Col>
            </Row>
        </Container>
    );
});

export default Server;