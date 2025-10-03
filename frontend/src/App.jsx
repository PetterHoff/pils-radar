
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//pages 
import Productpage from "./pages/ProductPage";
import Homepage from "./pages/Home";


const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product" element={<Productpage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;