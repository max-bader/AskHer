import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="bg-[#F3EEEA] py-4 px-6 flex justify-between items-center border-b">
      <Link to="/" className="text-2xl font-bold font-['DM_Sans']">AskHer</Link>
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 hover:text-gray-900 font-['DM_Sans']">Home</Link>
        <Link to="/ask" className="text-gray-600 hover:text-gray-900 font-['DM_Sans']">Ask a Question</Link>
        <Link to="/herlight" className="text-gray-600 hover:text-gray-900 font-['DM_Sans']">HerLight</Link>
        <Link to="/journal" className="text-gray-600 hover:text-gray-900 font-['DM_Sans']">Journal</Link>
        <Link to="/resources" className="text-gray-600 hover:text-gray-900 font-['DM_Sans']">Resources</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-gray-600 hover:text-gray-900 font-['DM_Sans']">Login</Link>
        <Button className="bg-[#8a7c98] hover:bg-[#796a87] text-white font-['DM_Sans']">
          <Link to="/signup" className="text-white">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation; 