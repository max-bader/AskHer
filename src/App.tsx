import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import ComfortHer from "@/pages/ComfortHer";
import HerLight from "@/pages/HerLight";
import Journal from "@/pages/Journal";
import Resources from "@/pages/Resources";
import AskQuestion from "@/pages/AskQuestion";
import Login from "@/pages/Login";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#F5DCF7]">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask" element={<AskQuestion />} />
          <Route path="/comfort" element={<ComfortHer />} />
          <Route path="/herlight" element={<HerLight />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
