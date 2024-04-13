import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import Groups from "./groups/Group";
import GlobalNavbar from "./commons/components/GlobalNavBar";
import GroupsDetail from "./groups/GroupsDetail";

function App() {
  return (
      <BrowserRouter>
          <GlobalNavbar />
          <Routes>
              <Route path={"/"} element={<Login />}/>
              <Route path={"/register"} element={<Register />}/>
              <Route path={"/groups"} element={<Groups />}/>
              <Route path={"/groups/:id"} element={<GroupsDetail />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
