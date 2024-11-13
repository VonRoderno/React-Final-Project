import React from "react";
import {useAuth} from "../context/UserContext";
import { Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function NavRoutes() {
    const { userLoggedIn } = useAuth();
    return (
        <Routes>
            <Route path="/" element={userLoggedIn ? <Home/> : <Login />}/>
            <Route path="/login" element={userLoggedIn ? <Home/> : <Login />} />
            <Route path="/signup" element={userLoggedIn ? <Home/> : <Signup />} />
            <Route path="/*" element={<Navigate to="/"/> }/>
        </Routes>
    );
}