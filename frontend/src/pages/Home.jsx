// Components
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

// Components
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";






const Homepage = () => {
  const [cheapest, setCheapest] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheapest = async () => {
      const { data, error } = await supabase
        .from('Products')
        .select()
        .eq("volume", 0.5)
        .order('price', { ascending: true })
        .limit(1);
        
      if (error) {
        setError(error);
      } else {
        setCheapest(data[0]);
      }
    };

    fetchCheapest();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="p-6">
        <h1 className="text-xl font-bold mb-4 flex justify-center"> Billigste 0.5L boks</h1>

        {error && <p className="text-red-500">{error}</p>}

        {cheapest && (
          <div className="flex justify-center">
            <ProductCard product={cheapest} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Homepage;
