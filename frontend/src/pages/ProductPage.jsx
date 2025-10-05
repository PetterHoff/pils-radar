// src/pages/Homepage.jsx
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

// Components
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const Productpage = () => {

  const [fetchError, setFetchError] = useState(null);
  const [products, setProducts] = useState(null);
  
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
  
  return (
    <div>
      <Navbar />
      <h2>Oversikt over alle produkter</h2>
      {fetchError && (<p>{fetchError}</p>)}
      {products && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Productpage;