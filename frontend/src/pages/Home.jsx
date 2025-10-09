// Components
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

// Components
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";


const Homepage = () => {
  const [cheapest05, setCheapest05] = useState(null);
  const [cheapest033, setCheapest033] = useState(null);
  const [cheapest3, setCheapest3] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheapest05 = async () => {
      const { data, error } = await supabase
        .from("Products")
        .select()
        .eq("volume", 0.5)
        .not("store", "in", "(Ukjent butikk,Engrosnett,Oda)")
        .order("price", { ascending: true })
        .limit(1);
  
      if (error) setError(error);
      else setCheapest05(data[0]);
    };
  
    const fetchCheapest033 = async () => {
      const { data, error } = await supabase
        .from("Products")
        .select()
        .eq("volume", 0.33)
        .not("store", "in", "(Ukjent butikk,Engrosnett,Oda)")
        .order("price", { ascending: true })
        .limit(1);
  
      if (error) setError(error);
      else setCheapest033(data[0]);
    };
  
    const fetchCheapest3 = async () => {
      const { data, error } = await supabase
        .from("Products")
        .select()
        .eq("volume", 3)
        .not("store", "in", "(Ukjent butikk,Engrosnett,Oda)")
        .order("price", { ascending: true })
        .limit(1);
  
      if (error) setError(error);
      else setCheapest3(data[0]);
    };
  
    fetchCheapest05();
    fetchCheapest033();
    fetchCheapest3();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="p-6">
        <h1 className="text-xl font-bold mb-4 flex justify-center"> Billigste 0.5, 0.33 og 6pack</h1>

        {/* ✅ Vis feilmelding riktig */}
        {error && <p className="text-red-500">{error.message}</p>}

        {(cheapest05 || cheapest033) && (
          <div className="flex justify-center gap-10 ">
            <ProductCard product={cheapest05} />
            <ProductCard product={cheapest033} />
            <ProductCard product={cheapest3} />
          </div>

        )}
      </section>
    </div>
  );
};

export default Homepage;
