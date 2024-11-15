import { NavLink} from 'react-router-dom'
import React from 'react';
import { useAuth } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'
import {logout} from "../services/authService";

export default function Navbar() {

    const { userLoggedIn, currentUser} = useAuth();
    const navigate = useNavigate()

    const handleLogout = async () =>  {
        await logout();
        navigate('/login')
      }

    return (
        <nav>
          <h1>Inventory Management System</h1>
          {console.log(userLoggedIn)}
                    
          {/* {userLoggedIn && (
              <>
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/about">About</NavLink>
                  <NavLink to="/contact">Contact</NavLink>
                  <NavLink to="/new">New Article</NavLink>
              </>
          )} */}
          {!userLoggedIn && (
            <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
            </>
          )
          
          }          

          {userLoggedIn && (
              <>
              hello, {currentUser.displayName}
              <button className="btn" onClick={handleLogout}>Logout</button>
              </>
          )}

        </nav>    
    )
}