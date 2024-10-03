import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<App />}></Route>
      {/* TODO: set up routes for positions */}
      {/* <Route path="qb" element={<App position="qb" />}></Route>
      <Route path="rb" element={<App position="rb" />}></Route>
      <Route path="wr" element={<App position="wr" />}></Route>
      <Route path="te" element={<App position="te" />}></Route>
      <Route path="def" element={<App position="def" />}></Route> */}
    </Routes>
  </BrowserRouter>
);
