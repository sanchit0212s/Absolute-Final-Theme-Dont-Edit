import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Home from "@/pages/Home";
import Forms from "@/pages/Forms";
import FormDetail from "@/pages/FormDetail";
import Discover from "@/pages/Discover";
import Workshop from "@/pages/Workshop";
import Connect from "@/pages/Connect";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/form/:handle" element={<FormDetail />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout />
    </BrowserRouter>
  );
}
