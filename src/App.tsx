import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { AskHerLayout } from "@/layouts/AskHerLayout";

import Index from "./pages/Index";
import AskQuestion from "./pages/AskQuestion";
import Chatbot from "./pages/Chatbot";
import HerLight from "./pages/HerLight";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
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
          <AskHerLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ask" element={<AskQuestion />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/herlight" element={<HerLight />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/topics" element={<TopicExplorer />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AskHerLayout>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
