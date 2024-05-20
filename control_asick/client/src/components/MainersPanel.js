import React, { useContext } from "react";
import { Card , ListGroup, Image, Container, Row, Col, CloseButton, Button} from "react-bootstrap";
import { Context } from "../index";
import defaut from "../img/defaut.jpg"
import { useNavigate } from "react-router-dom";
import { MAINER_ROUTER } from "../utils/consts";
import grinIO from "../img/grinIO.png"
import redIO from "../img/redIO.png"
import { observer } from "mobx-react-lite";
import { addMainer, changeMainer, delMainer } from "../http/mainerAPI";

const MainersPanel = observer(() => {
    const {info} = useContext(Context)
    const navigator = useNavigate()


    
    return (
        <Card 
            style={{borderRadius: 20}}
        > 
            <Button 
                style={{margin: 10}}
                variant="outline-dark"
                onClick={() => addMainer(info.server.id).then(data => info.addMainer(data))}
            >
                Добавить майнер
            </Button>
            <ListGroup>
                {info.mainers.map(mainer =>
                    <Card 
                        style={{margin: 20}}
                    >
                        <div className="d-flex">
                            <Image
                                src = {process.env.REACT_APP_API_URL + mainer.img}
                                width={90}
                                height={90}
                                style={{margin: 20, cursor: 'pointer' , objectFit: 'cover'}}
                                onClick={() => navigator(MAINER_ROUTER+ '/' + mainer.id)}
                            ></Image>
                            <Container style={{marginTop: 20}}>
                                <Row>
                                    <Col md={3}>
                                        <div 
                                            className="flex-column" 
                                        >
                                            <div style={{fontSize: 30}}>{mainer.name}</div>
                                            <div>ID: {mainer.id}</div>
                                        </div>
                                    </Col>
                                    <Col md={5}>
                                        <div 
                                            className="flex-column" 
                                        >
                                            <div>Потребление: {mainer.consum_el} Вт</div>
                                            <div>Хэшрейт: {mainer.hashrat} TH/s</div>
                                            <div>Стоимость: {mainer.cost} $</div>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div 
                                            className="flex-column" 
                                        >
                                            <div>Доход: {mainer.profit}$</div>
                                            <div>Расход: {mainer.expend}$</div>
                                            <div>Прибыль: {mainer.profit - mainer.expend}$</div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            {mainer.work?
                                <Image
                                    src={grinIO}
                                    width={90}
                                    height={90}
                                    style={{margin: 10, marginTop: 20, cursor: 'pointer' , objectFit: 'cover', marginLeft: 'auto'}}
                                    onClick={() => changeMainer(mainer.id, 'work', false).then(data => mainer.work = false)}
                                ></Image>
                                :
                                <Image
                                    src={redIO}
                                    width={90}
                                    height={90}
                                    style={{margin: 10, marginTop: 20, cursor: 'pointer' , objectFit: 'cover', marginLeft: 'auto'}}
                                    onClick={() => changeMainer(mainer.id, 'work', true).then(data => mainer.work =  true)}
                                ></Image>
                            }
                            <CloseButton
                                onClick={()=> {
                                    delMainer(mainer.id)
                                    info.delMainer(mainer.id)
                                }}
                            ></CloseButton>
                        </div>
                    </Card> 
                )}   
            </ListGroup>
        </Card>
        
    )
})

export default MainersPanel;