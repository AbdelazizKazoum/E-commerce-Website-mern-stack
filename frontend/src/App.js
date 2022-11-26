import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./pages/Products";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Products />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
