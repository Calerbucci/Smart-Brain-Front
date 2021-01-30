import React from 'react'
import './Navigation.css';
import { useHistory } from "react-router-dom";
import { useStateValue } from '../../StateProvider';

function Navigation() {
    const history = useHistory();
    const [{user}, dispatch] = useStateValue();

    const signout = (event) => {
        event.preventDefault();
        dispatch({
            type: "SET_USER",
            user: null,
        })
        dispatch({
            type: "UPDATE_INPUT",
            user: [],
        })
        history.push('./signin')
    }

    const signin = (e) => {
        e.preventDefault();
        history.push('./signin')
        
    }
    const signup = (e) => {
        e.preventDefault();
        history.push('./register')
    }



    if(user){
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
               <p onClick={signout} className='f3 link dim black underline pa3 pointer'> Sign out </p>
           </nav>
        )
    }else{
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
               <p onClick={signin} className='f3 link dim black underline pa3 pointer'> Sign in </p>
               <p onClick={signup} className='f3 link dim black underline pa3 pointer'> Register </p>
           </nav>
         )
    }
    
}

export default Navigation
