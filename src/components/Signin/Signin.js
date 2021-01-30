import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useStateValue } from '../../StateProvider';

function Signin() {
    const history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [, dispatch] = useStateValue();

    const data = {
        email: email,
        password: password
    }

    const signin = (event) => {   
        event.preventDefault();   

        fetch("https://protected-bayou-34915.herokuapp.com/signin", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        }) 
        .then(response => response.json())
        .then(data => {
            if(data?.id) 
            {
                dispatch({
                    type: "SET_USER",
                    user: data,
                });
                history.push('/navigation');
            }else{
                console.log(data);
            }
        })     
    }

    const register = () => {
        history.push('./register')
    }

    return (     
    <div>
     <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
         <form className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={e => setEmail(e.target.value)} value={email}  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" placeholder="Email"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input  onChange={e => setPassword(e.target.value)} value={password}  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" placeholder="Password" autoComplete/>
                    </div>
            </fieldset>
                <div className="">
                    <input onClick={signin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                    <p onClick={register} className="f6 link dim black db cursor" >Register</p>
                </div>
          </form>
        </main> 
        </article>  
    </div>   
    )
}

export default Signin
