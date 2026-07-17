import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
// import Menu from "./pages/Menu";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Success from "./pages/Success";

function App() {
  return (
   <>
  <Navbar />

  <main className="px-6 md:px-8 lg:px-10 xl:px-12">
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/menu" element={<Menu />} /> */}
      {/* <Route path="/cart" element={<Cart />} /> */}
      {/* <Route path="/checkout" element={<Checkout />} /> */}
      {/* <Route path="/success" element={<Success />} /> */}
    </Routes>
  </main>

  <Footer />
</>
  );
}

export default App;