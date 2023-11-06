import { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
import fireBase from "../../firebase/config";
import FirebaseContext from "../../store/Context";
import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  // const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const firebase = useContext(FirebaseContext);

  const handleLogin = (e) => {
    e.preventDefault();
    fireBase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
