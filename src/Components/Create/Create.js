import React, { Fragment, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';



const Create = () => {

  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const history = useHistory()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState('')

  const Handle_submit = () => {
    firebase.storage().ref(`/images/${image.name}`).put(image).then(({ ref }) => {
      ref.getDownloadURL().then((url) => {
        console.log('Image URL:----> ', url);
        firebase.firestore().collection('Products').add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: new Date().toISOString(),
        })
        history.push('/')
      })
    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input className="input" value={name} onChange={(event) => setName(event.target.value)} type="text" id="fname" name="Name" defaultValue="John" />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input className="input" value={category} onChange={(event) => setCategory(event.target.value)} type="text" id="fname" name="category" defaultValue="John" />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" value={price} onChange={(event) => setPrice(event.target.value)} type="number" id="fname" name="Price" />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} ></img>
            <br />
            <input type="file" onChange={(event) => setImage(event.target.files[0])} />
            <br />
            <button onClick={Handle_submit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
