import React, {useContext} from 'react';
import {Context} from '../index';
import {Navbar,Image,Nav,Container, Button} from 'react-bootstrap';
import {observer} from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import logo from "../img/logo.png"
import {LOGIN_ROUTER, SERVER_ROUTER} from '../utils/consts'

const NavBar = observer(() => {
    const {user, setting} = useContext(Context)
    const navigator = useNavigate()

    const logOut = () =>{
        user.setUser(false)
        user.setIsAuth(false)
        navigator(LOGIN_ROUTER)
    }

    return (
        <Navbar 
            color="white"
            style={{boxShadow:"1px 1px 7px black", marginBottom: "40px"}}
        >
            <Container>
                <Navbar.Brand>
                    <Image
                        alt="Server Maining"
                        src={logo}
                        height= "70"
                        rounded 
                        style={{cursor: 'pointer'}}
                        onClick={()=> {
                            user.isAuth? navigator(SERVER_ROUTER):navigator(LOGIN_ROUTER)
                        }}
                    />
                </Navbar.Brand>

                {user.isAuth?
                <Nav className="ms-auto" >
                    <Button
                        variant="outline-dark"
                        className='ms-2'
                        onClick={() => navigator(SERVER_ROUTER)}
                    >
                        Сервер
                    </Button>
                    <Button
                        variant="outline-dark"
                        className='ms-2'
                        onClick={() => setting.setSetting(true)}
                    >
                        Настройки
                    </Button>
                    <Button
                        variant="outline-dark"
                        className='ms-2'
                        onClick={logOut}
                    >
                        Выйти
                    </Button>
                    
                </Nav>
                :
                <Nav className="ms-auto" style = {{ margin: 10}}>
                    <Button 
                        variant="outline-dark"
                        onClick={() => navigator(LOGIN_ROUTER)}
                    >
                        Авторизация
                    </Button>
                </Nav>
            }

            </Container>
        </Navbar>
    );
});

export default NavBar;
