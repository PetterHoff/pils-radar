import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const [productPrices, setProductPrices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductPrices = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("Products")
        .select("*")
        .eq("ean", id);

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
      <div className="p-8 sm:p-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center md:text-left">
          Priser for {productName}
        </h2>

        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Produktbilde til venstre */}
          <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-1/3">
            <img
              src={productPrices.length > 0 ? productPrices[0].image : ""}
              alt={productName}
              className="w-60 h-60 object-contain"
            />
          </div>

          {/* Butikk-bokser til høyre */}
          <div className="flex flex-col gap-4 w-full md:w-2/3 md:pr-6">
            {productPrices
              .sort((a, b) => a.price - b.price)
              .map((item, index) => (
                <div
                  key={index}
                  className="w-full rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.store_logo}
                      alt={item.store}
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="font-medium text-gray-800">{item.store}</p>
                  </div>
                  <p className="text-lg  text-gray-900">
                    {item.price} kr
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
