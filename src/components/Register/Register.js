import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useStateValue } from '../../StateProvider';

function Register() {
    const history = useHistory();
    const [, dispatch] = useStateValue();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const data = {
        name: name,
        email: email,
        password: password
    }

    const signup = (event) => {
        event.preventDefault();   

        fetch("https://protected-bayou-34915.herokuapp.com/register",{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(user => {
            if(user?.id){
              dispatch({
                type: "SET_USER",
                user: user,
            });
            history.push('./navigation')
            }else{
                console.log(user);
            }
        })
         
    }

    return (
        <div>
       <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
         <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Register</legend>
                  <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                        <input onChange={e => setName(e.target.value)} value={name} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="name"  id="name" placeholder="Username"/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={e => setEmail(e.target.value)} value={email}  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" placeholder="Email"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input  onChange={e => setPassword(e.target.value)} value={password} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" placeholder="Password" autoComplete/>
                    </div>
            </fieldset>
                <div className="">
                    <input onClick={signup} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign Up"/>
                </div>
          </form>
        </main> 
        </article>  
    </div>
    )
}

export default Register
