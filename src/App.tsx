import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollTop";
import { SupportRequestsProvider } from "./context/SupportRequestsContext";
import AppInner from "./AppInner";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <SupportRequestsProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppInner />
        </BrowserRouter>
      </SupportRequestsProvider>
    </HelmetProvider>
  );
};

export default App;
