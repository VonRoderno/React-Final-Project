import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase/config";

const UserContext = createContext();

export function useAuth(){
    return useContext(UserContext);
}
const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        setLoading(true);
        return () => unsubscribe();
    },[])

    async function initializeUser(user){
        if (user){
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
        } else{
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }
    const value = {
        currentUser,
        userLoggedIn,
        loading
    }
    return (
        <UserContext.Provider value={ value }>
            {!loading && children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };