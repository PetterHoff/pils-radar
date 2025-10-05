import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import Navbar from "../components/Navbar";



const ProductDetails = () => {
    const { id } = useParams()
    const [productPrices, setProductPrices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchProductPrices = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("ean", id); // Henter alle produkter med samme EAN

      if (error) {
        setError("Kunne ikke hente priser for dette produktet");
        setProductPrices([]);
        console.log(error);
      } else {
        setProductPrices(data);
        setError(null);
      }

      setLoading(false);
    };

    fetchProductPrices();
  }, [id]);

  const productName = productPrices.length > 0 ? productPrices[0].name : "";
  return (
    <div>
      <Navbar />
      <div className="p-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Priser for {productName}
        </h2>

        <div className="flex flex-col md:flex-row items-start gap-12">
          
          {/* Produktbilde til venstre */}
          <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto">
            <img src={productPrices.length > 0 ? productPrices[0].image : ""} 
            alt={productName} 
            className="w-60 h-60 object-contain" />
          </div>
          
          {/* Priser til høyre */}
          {productPrices
            .sort((a, b) => a.price - b.price) 
            .map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border p-4 rounded-lg shadow-sm"
            >
              <img
                src={item.store_logo}
                alt={item.store}
                className="w-10 h-10 rounded-full"
              />
              <p className="font-medium w-32">{item.store}</p>
              <p className="text-lg">{item.price} kr</p>
            </div>
          ))}

          {/* beskrivelse kommer sener */}
        </div>
      </div>
    </div>

    );
  };

export default ProductDetails;