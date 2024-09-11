import React from 'react';
import { useEffect, useState, useContext } from 'react';

import './View.css';
import { posterContext } from '../../store/postesContext';
import { FirebaseContext } from '../../store/Context';


function View() {
  const [userDetails, setUserDetails] = useState()

  const { posterDetails } = useContext(posterContext)
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const { userId } = posterDetails
    firebase.firestore().collection('user').where('id', '==', userId).get().then((res) => {
      res.forEach(doc => {
        setUserDetails(doc.data())
      })
    })
  }, [])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={posterDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;  {posterDetails.price} </p>
          <span>{posterDetails.name}</span>
          <p>{posterDetails.category}</p>
          <span>{new Date(posterDetails.createdAt).toDateString()}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
