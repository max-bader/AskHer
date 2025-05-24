import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { LavenderLayout } from "@/layouts/LavenderLayout";

import Index from "./pages/Index";
import Chatbot from "./pages/Chatbot";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import Hotlines from "./pages/Hotlines";
import TopicExplorer from "./pages/TopicExplorer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LavenderLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/hotlines" element={<Hotlines />} />
              <Route path="/topics" element={<TopicExplorer />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LavenderLayout>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
