import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from'./pages/Auth';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import PlanSelector from "./components/Plan";
import PlanCalculator from "./components/Calculator";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const protectedRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/plan', element: <PlanSelector /> },
  { path: '/calculate', element: <PlanCalculator /> }
]

const App = () => (
  

  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plan" element={<PlanSelector />} />
            <Route path="/calculate" element={<PlanCalculator />} /> */}
            {protectedRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute>{element}</ProtectedRoute>}
              />
            ))}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
