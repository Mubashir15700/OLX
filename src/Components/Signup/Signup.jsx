import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Logo from "../../olx-logo.png";
import "./Signup.css";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();

  const auth = getAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validErrors = {};
    if (!userName || !email || !phone || !password) {
      validErrors.common = "All fields are required.";
    }

    if (Object.keys(validErrors).length) {
      setErrors(validErrors);
    } else {
      setErrors();
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, {
          displayName: userName
        });

        navigate("/login");
      } catch (error) {
        alert(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      }
    };
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            onChange={(e) => setUserName(e.target.value)}
            defaultValue="Niko Bellic"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue="nikob123@example.com"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            defaultValue="9876543210"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="Nb@123"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
          {errors && <p className="error">{errors.common}</p>}
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
