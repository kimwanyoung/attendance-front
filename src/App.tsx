import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import Groups from "./groups/Group";
import GlobalNavbar from "./commons/components/GlobalNavBar";
import GroupsDetail from "./groups/GroupsDetail";
import PostDetail from "./posts/PostDetail";
import useKakaoLoader from "./utils/kakaoMaps/kakaoMaps";
import GroupApproval from "./approval/GroupApproval";

function App() {
    useKakaoLoader();
    return (
        <BrowserRouter>
            <GlobalNavbar/>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/groups"} element={<Groups/>}/>
                <Route path={"/groups/:id"} element={<GroupsDetail/>}/>
                <Route path={"/groups/:groupId/posts/:postId"} element={<PostDetail/>}/>
                <Route path={"/groups/:groupId/approval"} element={<GroupApproval />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
