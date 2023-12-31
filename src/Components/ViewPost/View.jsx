import { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { PostContext } from '../../store/PostContext';
import './View.css';

function View() {
  const [userDetails, setUserDetails] = useState();

  const { postDetails } = useContext(PostContext);
  
  const db = getFirestore();

  useEffect(() => {
    const userquery = query(collection(db, "users"), where("id", "==", postDetails.userID));
    getDocs(userquery).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserDetails(doc.data());
      });
    });
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails &&
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        }
      </div>
    </div>
  );
}
export default View;
