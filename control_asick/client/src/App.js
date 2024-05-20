import React, {useContext, useState, useEffect} from "react";
import {BrowserRouter} from 'react-router-dom'
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Setting from "./components/Setting"
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { Spinner } from 'react-bootstrap';
import { check } from "./http/userAPI";
import { fetchMainers } from "./http/mainerAPI";
import { fetchServer } from "./http/serverAPI";
import { fetchUslov } from "./http/uslovAPI";

const App = observer(() => {
  const {setting, user, info} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data=> {
      user.setUser(data)
      user.setIsAuth(true)
      user.setId(data.id)
    }).finally(()=> setLoading(false))
  }, [])
    
   
  if (loading){
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style = {{height: window.innerHeight}}
      >
        <Spinner animation="border" variant="dark"/>
      </div>
    )
  }



  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
      <Setting show = {setting.setting} onHide={() => setting.setSetting(false)}/>
    </BrowserRouter>
  );
})

export default App;
