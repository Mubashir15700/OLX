import { createRoot } from "react-dom/client";
import fireBase from "./firebase/config";
import { FirebaseContext } from "./store/Context";
import Context from "./store/Context";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <FirebaseContext.Provider value={{ fireBase }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);
