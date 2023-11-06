import { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import fireBase from "../../firebase/config";
import { FirebaseContext } from "../../store/Context";
import Logo from "../../olx-logo.png";
import "./Signup.css";

export default function Signup() {
  // const history = useHistory();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const firebase = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    fireBase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
          .updateProfile({ displayName: userName })
          .then(() => {
            fireBase
              .firestore()
              .collection("users")
              .add({
                id: result.user.uid,
                username: userName,
                email: email,
                phone: phone,
              })
              .then(() => {
                // history.push("/login");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            defaultValue="John"
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
            defaultValue="John"
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
            defaultValue="Doe"
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
            defaultValue="Doe"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
