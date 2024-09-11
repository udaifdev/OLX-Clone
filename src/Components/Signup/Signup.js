
import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context'
import { useHistory } from 'react-router-dom';


export default function Signup() {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const { firebase } = useContext(FirebaseContext)

  const Handel_submit = (val) => {
    val.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      result.user.updateProfile({ displayName: username }).then(() => {
        firebase.firestore().collection('user').add({
          id: result.user.uid,
          username: username,
          phone: phone
        }).then(() => {
          history.push('/login')
        })
      })
    })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>

        <form onSubmit={Handel_submit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input className="input" value={username} onChange={(event) => setUsername(event.target.value)} type="text" id="fname" name="name" defaultValue="John" />

          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} type="email" id="fname" name="email" defaultValue="John" />

          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input className="input" value={phone} onChange={(event) => setPhone(event.target.value)} type="number" id="lname" name="phone" defaultValue="Doe" />

          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input className="input" value={password} onChange={(event) => setPassword(event.target.value)} type="password" id="lname" name="password" defaultValue="Doe" />

          <br />
          <br />
          <button>Signup Submit</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
