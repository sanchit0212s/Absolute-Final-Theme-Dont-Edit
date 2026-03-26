import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Layout />
      </BrowserRouter>
    </CartProvider>
  );
}
