import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

function App() {
  return (
   <>
  <Navbar />

  <main className="px-6 md:px-8 lg:px-10 xl:px-12">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      }/>
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={
          <ProtectedRoute>        
            <Checkout />
            </ProtectedRoute>
            } />
      <Route path="/success" element={
          <ProtectedRoute>
            <Success />
        </ProtectedRoute>
        } />
    <Route path="/orders" element={
          <ProtectedRoute>
            <Orders />
        </ProtectedRoute>
        } />
    <Route path="/admin" element={<Admin/>} />
    </Routes>
  </main>

  <Footer />
</>
  );
}

export default App;