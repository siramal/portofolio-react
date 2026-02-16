import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AnimatedRoutes from "./routes/animatedRoutes";
import "./style.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}
export default App;
