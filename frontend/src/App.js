import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDetailsPage from "./pages/UserDetailsPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container style={{ marginTop: "80px" }}  >
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="Products" element={<Products />} />
            <Route path="Products/:id" element={<ProductDetails />} />
            <Route path="cart/:id/*" element={<CartPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<UserDetailsPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
