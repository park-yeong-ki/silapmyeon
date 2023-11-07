import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Sidebar from "./components/commons/sidebar";
import Header from "./components/commons/Header";
import Home from "./pages/Home/Home";
import ResumeList from "./pages/resume/ResumeList";
import ResumeDetail from "./pages/resume/ResumeDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResumeCreate from "./pages/resume/ResumeCreate";
import ResumeModify from "./pages/resume/ResumeModify";
import ReviewList from "./pages/review/ReviewList";
import ReviewDetail from "./pages/review/ReviewDetail";
import ReviewModify from "./pages/review/ReviewModify";
import ReviewCreate from "./pages/review/ReviewCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="main">
          <Sidebar />
          <div className="page">
            {/* 홈 */}
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            {/* 자기소개서 */}
            <Routes>
              <Route path="/resume" element={<ResumeList />} />
              <Route path="/resume/:resumeId" element={<ResumeDetail />} />
              <Route
                path="/resume/:resumeId/modify"
                element={<ResumeModify />}
              />
              <Route path="/resume/create" element={<ResumeCreate />} />
            </Routes>
            {/* 면접후기 */}
            <Routes>
              <Route path="/review" element={<ReviewList />} />
              <Route path="/review/:reviewId" element={<ReviewDetail />} />
              <Route
                path="/review/:reviewId/modify"
                element={<ReviewModify />}
              />
              <Route path="/review/create" element={<ReviewCreate />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
