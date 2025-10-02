// src/pages/Homepage.jsx
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

// Components
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

const getContent = () => {
  return {
    header: "Velkommen til MatBørsen",
    subtitle: "Her finner du dagens beste priser",
  };
};

const Homepage = () => {
  const content = getContent();
  const [fetchError, setFetchError] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('Products') 
        .select();
        
      if (error) {
        setFetchError('Kunne ikke hente produktene');
        setProducts(null);
        console.log(error);
      }
      if (data) {
        setProducts(data);
        setFetchError(null);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Header content={content} />
      <h2>Data fra Supabase</h2>
      {fetchError && (<p>{fetchError}</p>)}
      {products && (
        <div className="products">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;