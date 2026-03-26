import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Index from "@/pages/Index";
import Collection from "@/pages/Collection";
import ProductDetail from "@/pages/ProductDetail";
import Guide from "@/pages/Guide";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/product/:handle" element={<ProductDetail />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}
