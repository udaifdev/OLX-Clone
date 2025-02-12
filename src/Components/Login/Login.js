import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const Handel_login = (val) => {
    val.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      history.push('/')
    }).catch(() => {
      alert('Error Undallo ------->')
    })
  }
  
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={Handel_login}>

          <label htmlFor="fname">Email</label>
          <br />
          <input className="input" value={email}  onChange={(event) => setEmail(event.target.value)} type="email" id="fname" name="email" defaultValue="John"/>

          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input className="input" value={password} onChange={(event) => setPassword(event.target.value)} type="password" id="lname" name="password" defaultValue="Doe"/>

          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
