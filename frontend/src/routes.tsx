import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import Details from "./pages/{id}/Details";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Address from "./pages/Address";
import OrderDetails from "./pages/{id}/OrderDetails";

const AppRoutes: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen mt-20">
          <Navbar />

          <main className="flex-grow mb-16">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Account />} />
              <Route path="/address" element={<Address />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/order/:orderId" element={<OrderDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default AppRoutes;
