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
  let allProducts = [];
  let page = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      console.log(`📦 Henter side ${page}...`);
      const res = await axios.get(`${API_URL}/products`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: { search: "pilsner", size: 100, page },
      });

      const data = res.data.data;
      if (!data || data.length === 0) {
        hasMore = false;
        break;
      }

      allProducts.push(...data);
      page++;
    }



    console.log(`✅ Fant totalt ${allProducts.length} produkter`);

    const mappedProducts = allProducts.map(p => ({
        name: p.name,
        brand: p.brand,
        price: p.current_price,
        image: p.image,
        ean: p.ean,
        volume: normalizeVolume(p),
        store: p.store?.name || "Ukjent butikk",
        store_logo: p.store?.logo || null,
        price_history: p.price_history
      }));


    const seen = new Set();
    const uniqueProducts = mappedProducts.filter((p) => {
      const key = `${p.ean}-${p.store}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
      });

    console.log(`🧾 Etter duplikatfjerning: ${uniqueProducts.length} unike produkter`);

    /*  
    insert supabase
    */
    const {error } = await supabase
      .from("Products")
      .upsert(uniqueProducts, { onConflict: ["ean", "store"] })
      .select();

    if (error) throw error;
    console.log("Produkter lagret i Supabase");
  } catch (err) {
    console.error("Feil:", err.message);
  }
}
export { fetchProducts };