import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { FloatingBudgetButton } from "./components/layout/floating/FloatingBudgetButton";
import { FloatingWhatsAppButton } from "./components/layout/floating/FloatingWhatsAppButton";
import { Main } from "./components/layout/Main";
import { usePageTracking } from "./hooks/usePageTracking";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import { HomePage } from "./pages/Home/HomePage";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";

function AppContent() {
  usePageTracking();
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<HomePage />} />
          <Route path="sobre" element={<AboutPage />} />
          <Route path="obras" element={<PortfolioPage />} />
          <Route path="contato" element={<ContactPage />} />
        </Route>
      </Routes>
      <FloatingBudgetButton />
      <FloatingWhatsAppButton />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
