
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FitnessProvider } from "./context/FitnessContext";
import { PageLayout } from "./components/layout/PageLayout";

// Pages
import Index from "./pages/Index";
import Activities from "./pages/Activities";
import Goals from "./pages/Goals";
import ActivityCalendarPage from "./pages/ActivityCalendarPage";
import BMI from "./pages/BMI";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FitnessProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/calendar" element={<ActivityCalendarPage />} />
              <Route path="/bmi" element={<BMI />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageLayout>
        </BrowserRouter>
      </FitnessProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
