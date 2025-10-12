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


const volumeFromName = (name) => {
  if (!name) return null;

  const lower = name.toLowerCase();
  if (lower.includes("0,33l") || lower.includes("0.33l") || lower.includes("0.33") || lower.includes("0,33") || lower.includes("0,33l")) return 0.33;
  
  if (lower.includes("0,5l") || lower.includes("0.5l") || lower.includes("0.50") || lower.includes("0,50") || lower.includes("0,50l")) return 0.5;
  
  return null;

}
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

    const mappedProducts = allProducts.map(p => {
      let volume = normalizeVolume(p);

      if (!volume) {
        volume = volumeFromName(p.name);
      }

      return {
        name: p.name,
        brand: p.brand,
        price: p.current_price,
        image: p.image,
        ean: p.ean,
        volume,
        store: p.store?.name || "Ukjent butikk",
        store_logo: p.store?.logo || null,
        price_history: p.price_history
      };
    });

  {/* fjerner duplikater */}
  const seen = new Set();
  const uniqueProducts = mappedProducts.filter((p) => {
    const key = `${p.ean}-${p.store}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
    });

  {/* fjerner manglende butikk*/}
  const storeProducts = uniqueProducts.filter(p => p.store !== "Ukjent butikk");

  {/* fjerner alkholfri*/}
  const alkoholProducts = storeProducts.filter(p => !p.name.includes("0.0"))

  {/* manglende bildehåndtering */}
   const imageMap = new Map();
   
   alkoholProducts.forEach((p) => {
    if (p.image && !imageMap.has(p.ean)) {
      imageMap.set(p.ean, p.image);
    }
   });
   const imageFilledProducts = alkoholProducts.map((p) => {
    const finalImage = p.image || imageMap.get(p.ean) || null;
    return{...p, image: finalImage}

   });

   const withImages = imageFilledProducts.filter(
    (p) => p.image !== null && p.image !== ""
  );



      
    /*  
    insert supabase
    */
    const {error } = await supabase
      .from("Products")
      .upsert(withImages, { onConflict: ["ean", "store"] })
      .select();

    if (error) throw error;
    console.log("Produkter lagret i Supabase");
  } catch (err) {
    console.error("Feil:", err.message);
  }
}
export { fetchProducts };