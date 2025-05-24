import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, BookText, Folder, Phone } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UserPoints } from "@/components/UserPoints";
import { useApp } from "@/contexts/AppContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useApp();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Sidebar variant="inset" className="border-r border-pink-100">
          <SidebarHeader className="border-b border-pink-100 pb-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <h1 className="text-xl font-semibold text-pink-900">AskHer</h1>
              </Link>
              <SidebarTrigger />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              The Anonymous Sisterhood Support Chain
            </p>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  as={Link}
                  to="/"
                  isActive={location.pathname === "/"}
                  tooltip="Home"
                >
                  <Home className="text-pink-600" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  as={Link}
                  to="/chatbot"
                  isActive={location.pathname === "/chatbot"}
                  tooltip="AI Chatbot"
                >
                  <MessageCircle className="text-pink-600" />
                  <span>Chatbot</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  as={Link}
                  to="/journal"
                  isActive={location.pathname === "/journal"}
                  tooltip="Journal"
                >
                  <BookText className="text-pink-600" />
                  <span>Journal</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  as={Link}
                  to="/resources"
                  isActive={location.pathname === "/resources"}
                  tooltip="Resources"
                >
                  <Folder className="text-pink-600" />
                  <span>Resources</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  as={Link}
                  to="/hotlines"
                  isActive={location.pathname === "/hotlines"}
                  tooltip="Hotlines"
                >
                  <Phone className="text-pink-600" />
                  <span>Hotlines</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <SidebarSeparator />
            <UserPoints user={user} />
            <div className="flex flex-col gap-2 px-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                as={Link}
                to="/topics"
                className="w-full bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 border-pink-200"
              >
                Explore Topics
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <main className="container mx-auto py-6 px-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
