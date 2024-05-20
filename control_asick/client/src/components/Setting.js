import React, { useContext, useState, useEffect} from 'react'
import {Form, Button, Dropdown} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchServer } from '../http/serverAPI';
import { changeUser, fetchUser } from '../http/userAPI';
import { changeUslov, fetchUslov } from '../http/uslovAPI';

const Setting = observer(({show, onHide}) => {
    const {info, user} = useContext(Context)

    const [nikname, setNikname] = useState("")
    const [login, setLogin] = useState("")
    const [costEl, setCostEl] = useState(0)
    const [costHesh, setCostHesh] = useState(0)
    const [costArend, setCostArend] = useState(0)
      
    useEffect(()=>{
        fetchUser(user.id).then(data => {
            info.setUser(data)
            fetchServer(data.serverId).then(data => {
                info.setServer(data)
                fetchUslov(data.uslovId).then(data => {
                    info.setUslov(data)
                    setNikname(info.user.nikname)
                    setLogin(info.user.email)
                    setCostEl(info.uslov.cost_el)
                    setCostHesh(info.uslov.cost_hesh)
                    setCostArend(info.uslov.cost_arend)
                })
            })
        })
    }, [])

    const save = () =>{
        changeUser(user.id, nikname, login)
        changeUslov(info.uslov.id, costArend,costEl,costHesh)
        onHide()
    }

    return (
        <Modal
        show = {show}
        onHide={onHide}
        size = "lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Настройки
          </Modal.Title>
        </Modal.Header>


        <Modal.Body>

            <Form className='mt-2'>
                <Form.Label>
                    Имя пользователя:
                </Form.Label>
                <Form.Control
                    value = {nikname}
                    onChange={e => setNikname(e.target.value)}
                    placeholder={"Имя пользователя"}
                />
            </Form>

            <Form className='mt-2'>
                <Form.Label>
                    Логин:
                </Form.Label>
                <Form.Control
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    placeholder={"Логин"}
                />
            </Form>

            <Form className='mt-2'>
                <Form.Label>
                    Стоимость электричества:
                </Form.Label>
                <Form.Control
                    value={costEl}
                    onChange={e => setCostEl(e.target.value)}
                    placeholder={"Стоимость электричества"}
                />
            </Form>

            <Form className='mt-2'>
                <Form.Label>
                    Вознагрождение:
                </Form.Label>
                <Form.Control
                    value={costHesh}
                    onChange={e => setCostHesh(e.target.value)}
                    placeholder={"Стоимосте хэштрейна"}
                />
            </Form>

            <Form className='mt-2'>
                <Form.Label>
                    Аренда:
                </Form.Label>
                <Form.Control
                    value={costArend}
                    onChange={e => setCostArend(e.target.value)}
                    placeholder={"Аренда"}
                />
            </Form>

        </Modal.Body>


        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
          <Button variant="outline-success" onClick={save}>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    );
});

export default Setting;