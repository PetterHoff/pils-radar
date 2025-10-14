import { Link } from "react-router-dom";
import Logo from "../../assets/logo";


const Navbar = () => {
    return (
      <nav className = "bg-white shadow-md">
        <div className= "w-full px-4 sm:px-6  lg:px-10 flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
            <span className="font-bold text-xl text-gray-800">PilsRadar</span>
          </Link>
          {/* Meny */}
          <ul className = "flex space-x-3 sm:space-x-6 text-sm sm:text-base">
            <li>
              <Link to="/"
              className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-500 hover:bg-gray-100 transition"
              >
              Hjem
              </Link>
              <Link to="/product"
              className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-500 hover:bg-gray-100 transition"
              >
              Prisoversikt
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Navbar; 


  