import { Fragment, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { AuthContext } from '../../store/Context';
import Header from '../Header/Header';
import './Create.css';

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState();

  const { user } = useContext(AuthContext);
  const storage = getStorage();
  const db = getFirestore();

  const navigate = useNavigate();

  const date = new Date().toDateString();

  const handleSubmit = async () => {
    const validErrors = {};
    if (!name || !category || !price || !image) {
      validErrors.common = "All fields are required.";
    }

    if (Object.keys(validErrors).length) {
      setErrors(validErrors);
    } else {
      setErrors();
      try {
        const storageRef = ref(storage, `/images/${image.name}`);
        const reference = await uploadBytes(storageRef, image);
        const url = await getDownloadURL(reference.ref);

        const productData = {
          name: name,
          category: category,
          price: price,
          url: url,
          userID: user.uid,
          createdAt: date,
        };
        await addDoc(collection(db, "products"), productData);
        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            onChange={(e) => setName(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image && URL.createObjectURL(image)}></img>
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          {errors && <p className='error'>{errors.common}</p>}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
