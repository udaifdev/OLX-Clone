import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';
import Heart from '../../assets/Heart';
import './Post.css';
import { posterContext } from '../../store/postesContext';

function Posts() {
  const { firebase } = useContext(FirebaseContext)

  const { setPosterDetails } = useContext(posterContext)

  const [products, setProducts] = useState([])

  const history = useHistory()

  useEffect(() => {
    firebase.firestore().collection('Products').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      console.log('All post ---->  ', allPost);
      setProducts(allPost)
    })
  }, [])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

        <div className="cards">
          {
            products.map((product) => {
              return (
                <div key={product.id} className="card" onClick={() => {setPosterDetails(product); history.push('/view')} }>
                  <div className="favorite">
                    <Heart />
                  </div>
                  <div className="image">
                    <img src={product.url} alt="Image is null" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name">{product.name}</p>
                  </div>
                  <div className="date">
                    <span>{new Date(product.createdAt).toDateString()}</span>
                  </div>
                </div>
              );
            })
          }
        </div>

      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
