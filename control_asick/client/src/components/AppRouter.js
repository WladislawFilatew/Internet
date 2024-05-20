import React, { useContext } from 'react';
import {Routes,Route} from "react-router-dom";
import {authRoutes,publicRoutes} from "../routes";
import Auth from "../pages/Auth"
import {Context} from "../index"


const AppRouter = () => {
    const {user} = useContext(Context)
    return (
    <Routes>
       {user.isAuth && authRoutes.map(({patch, Component}) =>
            <Route key = {patch}  path={patch} element={<Component/>} exact/>
        )}
        {publicRoutes.map(({patch , Component}) =>
            <Route key = {patch} path = {patch} element={<Component/>} exact/>
        )}
        <Route path = "*" element={<Auth/>}/>
    </Routes>
   )
   
};
export default AppRouter;