import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";
import ReserveDrawer from "@/components/ReserveDrawer";
import Home from "@/pages/Home";
import Forms from "@/pages/Forms";
import FormDetail from "@/pages/FormDetail";
import Story from "@/pages/Story";
import Contact from "@/pages/Contact";

function Layout() {
  return (
    <>
      <FloatingNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/form/:handle" element={<FormDetail />} />
          <Route path="/story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <ReserveDrawer />
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
