import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { PostContext } from '../../store/PostContext';
import Heart from '../../assets/Heart';
import './Post.css';

function Posts() {
  const [products, setProducts] = useState([]);

  const db = getFirestore();

  const navigate = useNavigate();

  useEffect(() => {
    getDocs(collection(db, "products")).then((data) => {
      const posts = data.docs.map((post) => {
        return {
          ...post.data(),
          id: post.id,
        };
      });
      setProducts(posts);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const { setPostDetails } = useContext(PostContext);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product, index) => {
            return <div
              key={index}
              className="card"
              onClick={() => {
                setPostDetails(product);
                navigate("/view-post");
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          })}
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
