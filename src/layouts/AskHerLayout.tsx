import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

interface AskHerLayoutProps {
  children: React.ReactNode;
}

export const AskHerLayout: React.FC<AskHerLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useApp();
  const isLoggedIn = user.id !== ""; // Check if user is logged in

  // Function to determine if a nav link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#F5DCF7] text-gray-900">
      {/* Header - AskHer style */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex items-center h-14 px-4">
          <div className="flex items-center mr-12">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-serif font-semibold">AskHer</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-6 text-sm">
            <Link
              to="/"
              className={`hover:text-purple-700 ${isActive("/") ? "text-purple-700" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/ask"
              className={`hover:text-purple-700 ${isActive("/ask") ? "text-purple-700" : ""}`}
            >
              Ask a Question
            </Link>
            <Link
              to="/herlight"
              className={`hover:text-purple-700 ${isActive("/herlight") ? "text-purple-700" : ""}`}
            >
              HerLight
            </Link>
            <Link
              to="/journal"
              className={`hover:text-purple-700 ${isActive("/journal") ? "text-purple-700" : ""}`}
            >
              Journal
            </Link>
            <Link
              to="/resources"
              className={`hover:text-purple-700 ${isActive("/resources") ? "text-purple-700" : ""}`}
            >
              Resources
            </Link>
          </nav>

          {/* User authentication */}
          <div className="ml-auto">
            {isLoggedIn ? (
              <div className="bg-[#8a7c98] text-white text-sm rounded-full px-4 py-1.5">
                Logged in as {user.supportTitle}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="text-sm text-gray-700 bg-white border border-gray-300 rounded-full px-4 py-1.5 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm text-white bg-[#8a7c98] rounded-full px-4 py-1.5 hover:bg-[#796a87]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};
