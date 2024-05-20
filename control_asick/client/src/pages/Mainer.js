import React, { useContext , useEffect, useState} from "react";
import {Button, Card, Form, Image} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Context } from "../index";
import { changeMainer, fetchMainers, imgMainer } from "../http/mainerAPI";
import { fetchUser } from "../http/userAPI";
import { useNavigate } from "react-router-dom";
import { MAINER_ROUTER, SERVER_ROUTER } from "../utils/consts";
import Graf from "../components/Graf";

const Mainer = () => {
    const navigator = useNavigate()
    const {info, user} = useContext(Context)
    useEffect(()=>{
        fetchUser(user.id).then(data => {
            info.setUser(data)
            fetchMainers(data.serverId).then(data => info.setMainers(data))
        })
    }, [])

    const {id} = useParams();
    const mainer = info.mainers.find(temp => temp.id == id)

    const [file, setFile] = useState(null)
    const selectFile = e =>{
        setFile(e.target.files[0])
    }
    const [name, setName] = useState(mainer.name)
    const [hash, setHash] = useState(mainer.hashrat)
    const [cost, setCost] = useState(mainer.cost)
    const [consumEl, setConsumEl] = useState(mainer.consum_el)

    const save =  async () => {
        if (name != mainer.name){
            await changeMainer(id, 'name', name)
        }
        if (hash != mainer.hashrat){
            await changeMainer(id, 'hashrat', hash)
        }
        if (cost != mainer.cost){
            await changeMainer(id, 'cost', cost)
        }
        if (consumEl != mainer.consum_el){
            await changeMainer(id, 'consum_el', consumEl)
        }
        if (file != null){
            const img = new FormData()
            img.append('img', file)
            img.append('pole', 'img')
            await imgMainer(id, img)
        }
        navigator(SERVER_ROUTER)
    }

    return (
        <div>
        <Card>
            <Form>
            <div className="d-flex">
                <div>
                    <Image
                        src = {process.env.REACT_APP_API_URL + mainer.img}
                        width={350}
                        height={350}
                        style={{margin: 50, cursor: 'pointer' , objectFit: 'cover'}}
                    ></Image>
                    <Form.Control 
                        style={{borderColor: 'black', margin: 10}}
                        type='file' 
                        onChange={selectFile}
                        
                    />
                </div>
                <div style={{marginLeft: 150, fontSize: 30}}>
                    <div
                        style={{margin: 10}}
                        className="d-flex"
                    >
                        Имя: 
                        <Form.Control
                            style={{marginLeft: 200, borderColor: 'black'}}
                            onChange={e => setName(e.target.value)}
                            placeholder= {name}
                        />
                    </div>
                    <div
                        style={{margin: 10}}
                        className="d-flex"
                    >
                        Хэшрейт: 
                        <Form.Control
                            style={{marginLeft: 140, borderColor: 'black'}}
                            onChange={e => setHash(e.target.value)}
                            placeholder= {hash}
                        />
                    </div>
                    <div
                        style={{margin: 10}}
                        className="d-flex"
                    >
                        Цена: 
                        <Form.Control
                            style={{marginLeft: 190, borderColor: 'black'}}
                            onChange={e => setCost(e.target.value)}
                            placeholder= {cost}
                        />
                    </div>
                    <div
                        style={{margin: 10}}
                        className="d-flex"
                    >
                        Потребление: 
                        <Form.Control
                            style={{marginLeft: 75, borderColor: 'black'}}
                            onChange={e => setConsumEl(e.target.value)}
                            placeholder= {consumEl}
                        />
                    </div>
                    <Button
                        style={{marginLeft: 275}}
                        variant="outline-danger"
                        size="lg"
                        onClick={()=> navigator(SERVER_ROUTER)}
                    >
                        Отмена
                    </Button>
                    <Button
                        style={{marginLeft: 10}}
                        variant="outline-success"
                        size="lg"
                        onClick={() => save()}
                    >
                        Сохранить
                    </Button>
                </div>

                           
            </div>
            </Form>
        </Card>
        <Graf/>
        </div>
    );
};

export default Mainer;