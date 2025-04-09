
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import WeddingForm from "./pages/WeddingForm";
import TemplateSelection from "./pages/TemplateSelection";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import PhotoGallery from "./pages/PhotoGallery";
import GuestManagement from "./pages/GuestManagement";
import TemplatePreview from "./pages/TemplatePreview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/wedding-form" element={<WeddingForm />} />
          <Route path="/template-selection" element={<TemplateSelection />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/photo-gallery" element={<PhotoGallery />} />
          <Route path="/guest-list" element={<GuestManagement />} />
          <Route path="/preview/:templateId" element={<TemplatePreview />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
