import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Index from "@/pages/Index";
import Collection from "@/pages/Collection";
import ProductDetail from "@/pages/ProductDetail";
import Guide from "@/pages/Guide";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 pt-[100px]">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
  );
}
