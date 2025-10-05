
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//pages 
import Productpage from "./pages/ProductPage";
import Homepage from "./pages/Home";
import ProductDetails from "./pages/ProductDetails"

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product" element={<Productpage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;