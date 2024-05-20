import React, { useContext, useState } from "react";
import { Button, Container, Form ,Col} from "react-bootstrap";
import Card from "react-bootstrap/Card"
import { NavLink, useLocation } from "react-router-dom";
import { REGISTRATION_ROUTER, LOGIN_ROUTER, SERVER_ROUTER } from "../utils/consts";
import Row from "react-bootstrap/Row";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useNavigate } from 'react-router-dom';
import { registration , login, fetchUser} from "../http/userAPI";

const Auth = observer(() =>{
    const {user, info} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTER
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigator = useNavigate()

    const click = async () => {
        let data;
        try{
            if (isLogin){
                data = await login(email,password);
            }else{
                data = await registration(email,password);
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigator(SERVER_ROUTER)
        }catch(e){
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style = {{height: window.innerHeight - 150}}
        >
            <Card style = {{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin?'Авторизация':'Регистрация'}</h2>
                <Form className = "d-flex flex-column">
                    <Form.Control
                        className = "mt-3"
                        placeholder = "Введите ваш email..."
                        value = {email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className = "mt-3"
                        placeholder = "Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type = "password"
                    />
                    <Row>
                        <Col className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            {isLogin?
                                <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTER}>Зарегистрируйся!</NavLink></div>
                                :<div>Есть аккаунт? <NavLink to={LOGIN_ROUTER}>Войдите!</NavLink></div>
                            }
                            <Button 
                                variant={"outline-success"}
                                onClick={click}
                            >
                                {isLogin?'Войти':'Регистрация'}
                            </Button>
                        </Col>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;