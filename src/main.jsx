import { createRoot } from "react-dom/client";
import { Firebase } from "./firebase/config";
import { FirebaseContext } from "./store/Context";
import Context from "./store/Context";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <FirebaseContext.Provider value={{ Firebase }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);
