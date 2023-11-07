import { useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from './Pages/ViewPost';
import { AuthContext, FirebaseContext } from './store/Context';
import Post from "./store/PostContext";

function App() {

  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view-post" element={<View />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
