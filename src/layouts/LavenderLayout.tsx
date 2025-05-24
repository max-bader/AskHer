import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MessageCircle,
  BookText,
  Folder,
  Phone,
  Search,
  Heart,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";

interface LavenderLayoutProps {
  children: React.ReactNode;
}

export const LavenderLayout: React.FC<LavenderLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useApp();

  return (
    <div className="min-h-screen bg-[#f6ecff] text-gray-900">
      {/* Header - Lavender style */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto flex items-center h-14 px-4">
          <div className="flex items-center mr-12">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-serif font-semibold">AskHer</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-sm">
            <Link to="/" className="hover:text-purple-700">
              Home
            </Link>
            <Link to="/topics" className="hover:text-purple-700">
              Ask a Question
            </Link>
            <Link to="/hotlines" className="hover:text-purple-700">
              HerLight
            </Link>
            <Link to="/journal" className="hover:text-purple-700">
              Journal
            </Link>
            <Link to="/resources" className="hover:text-purple-700">
              Resources
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-700 border-gray-300"
            >
              Login
            </Button>
            <Button className="bg-[#8a7c98] hover:bg-[#796a87] text-white rounded-md">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Main Content */}
        <main>{children}</main>
      </div>
    </div>
  );
};
