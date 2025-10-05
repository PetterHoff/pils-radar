import axios from "axios";
import { supabase } from "./supabaseClient.js";
import dotenv from "dotenv";

dotenv.config();

const API_URL = "https://kassal.app/api/v1";
const API_KEY = process.env.KASSALAPPEN_API_KEY;


const normalizeVolume = (p) => {
  if (!p.weight || !p.weight_unit) return null;

  switch (p.weight_unit.toLowerCase()) {
    case "ml": return p.weight / 1000;
    case "l": return p.weight;
    case "cl": return p.weight / 100;
    default: return null;
  };
};


async function fetchProducts() {
  try {
    // hent unike øl-produkter fra Kassalappen API
    const res = await axios.get(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      params: { search: "pilsner", size: 50, page: 1 }
    });
          
    const products = res.data.data;
    console.log(`Fant ${products.length} produkter`);

    console.log(products[2]);
    /*
    Mapping
    */
    const mappedProducts = products.map(p => ({
        name: p.name,
        brand: p.brand,
        price: p.current_price,
        image: p.image,
        ean: p.ean,
        volume: normalizeVolume(p),
        store: p.store.name,
        store_logo: p.store.logo,
        price_history: p.price_history
      }));

    /*
    insert supabase
    */
    const {error } = await supabase
      .from("Products")
      .upsert(mappedProducts, { onConflict: ["ean", "store"] })
      .select();

    if (error) throw error;
    console.log("Produkter lagret i Supabase");
  } catch (err) {
    console.error("Feil:", err.message);
  }
}
export { fetchProducts };