import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddList from "./components/AddList";
import List from "./components/List";
import Lists from "./components/Lists";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/lists" className="navbar-brand">
          SZM
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/lists"} className="nav-link">
              Lists
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add new
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Lists/>} />
          <Route path="/lists" element={<Lists/>} />
          <Route path="/add" element={<AddList/>} />
          <Route path="/lists/:id" element={<List/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
