// src/pages/Homepage.jsx
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

// Components
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

//data 
import cityStores from "../data/cityStores.json";

const Productpage = () => {

  const [fetchError, setFetchError] = useState(null);
  const [products, setProducts] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('Products').select();
        
      if (error) {
        setFetchError('Kunne ikke hente produktene');
        setProducts(null);
        console.log(error);
      }

      const cheapestMap = new Map();
      
      data.forEach((item) => {
        const existing = cheapestMap.get(item.ean);
        const safeImage = !item.image?.includes("bilder.kolonial.no")
          ? item.image
          : existing?.image;

        if (!existing) {
          cheapestMap.set(item.ean, { ...item, image: safeImage });
        } else {

          if (item.price < existing.price) {
            cheapestMap.set(item.ean, { ...item, image: safeImage });
          }

          else if (!existing.image && item.image) {
            cheapestMap.set(item.ean, { ...existing, image: safeImage });
          }
        }
      });
      const cheapestProducts = Array.from(cheapestMap.values());
      setProducts(cheapestProducts);
    };

    fetchProducts();
  }, []);

  {/* filtercity */}
  const toggleCity = (city) => {
    setSelectedCities((prev) =>
      prev.includes(city)
        ? prev.filter((c) => c !== city)
        : [...prev, city]
    );
  };

  const cities = Object.keys(cityStores);

  // 🔍 Filtrer produkter basert på valgte byer
  const filteredProducts =
    selectedCities.length === 0
    ? products
    : products?.filter((p) =>
        selectedCities.some((city) =>
          cityStores[city]?.includes(p.store)
        )
      );



  return (
    <div>
      <Navbar />
      <h2>Oversikt over all pils </h2>
      
      {/* By-knapper med flervalg */}
      <div className="flex gap-3 flex-wrap justify">
      {cities.map((city) => (
            <button
              key={city}
              onClick={() => toggleCity(city)}
              className={`px-4 py-2 rounded-full border font-medium transition-all duration-200
                ${
                  selectedCities.includes(city)
                    ? "bg-amber-500 text-white border-yellow-400 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {city}
            </button>
          ))}
      </div>

      {fetchError && (<p>{fetchError}</p>)}
      {filteredProducts && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.filter(product => product.price)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Productpage;