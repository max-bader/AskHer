import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MessageCircle,
  BookText,
  Folder,
  Phone,
  Search,
  Menu,
  Bell,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";
import { CommunityInfo } from "@/components/CommunityInfo";
import { TopCommunities } from "@/components/TopCommunities";

interface RedditLayoutProps {
  children: React.ReactNode;
}

export const RedditLayout: React.FC<RedditLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header - Reddit style */}
      <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto flex items-center h-12 px-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 md:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <h1 className="text-xl font-semibold hidden md:block">AskHer</h1>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search AskHer..."
                className="w-full h-9 pl-10 bg-gray-100 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4">
              New Post
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white rounded-md shadow-sm p-4 mb-4">
            <nav className="space-y-2">
              <NavItem
                to="/"
                icon={<Home />}
                label="Home"
                active={location.pathname === "/"}
              />
              <NavItem
                to="/chatbot"
                icon={<MessageCircle />}
                label="Chatbot"
                active={location.pathname === "/chatbot"}
              />
              <NavItem
                to="/journal"
                icon={<BookText />}
                label="Journal"
                active={location.pathname === "/journal"}
              />
              <NavItem
                to="/resources"
                icon={<Folder />}
                label="Resources"
                active={location.pathname === "/resources"}
              />
              <NavItem
                to="/hotlines"
                icon={<Phone />}
                label="Hotlines"
                active={location.pathname === "/hotlines"}
              />
            </nav>
          </div>
        )}

        {/* Left Sidebar - Navigation - Hidden on mobile */}
        <div className="hidden md:block w-56 flex-shrink-0">
          <div className="bg-white rounded-md shadow-sm p-4 sticky top-16">
            <nav className="space-y-2">
              <NavItem
                to="/"
                icon={<Home />}
                label="Home"
                active={location.pathname === "/"}
              />
              <NavItem
                to="/chatbot"
                icon={<MessageCircle />}
                label="Chatbot"
                active={location.pathname === "/chatbot"}
              />
              <NavItem
                to="/journal"
                icon={<BookText />}
                label="Journal"
                active={location.pathname === "/journal"}
              />
              <NavItem
                to="/resources"
                icon={<Folder />}
                label="Resources"
                active={location.pathname === "/resources"}
              />
              <NavItem
                to="/hotlines"
                icon={<Phone />}
                label="Hotlines"
                active={location.pathname === "/hotlines"}
              />
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Right Sidebar - Community Info */}
        <div className="hidden lg:block w-72 flex-shrink-0 space-y-4">
          <CommunityInfo />
          <TopCommunities />
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        active ? "bg-orange-50 text-orange-500 font-medium" : "hover:bg-gray-50"
      }`}
    >
      <span className={active ? "text-orange-500" : "text-gray-500"}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
};
