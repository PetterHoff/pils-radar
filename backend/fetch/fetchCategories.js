import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // last inn .env

const API_URL = "https://kassal.app/api/v1";
const API_KEY = process.env.KASSALAPPEN_API_KEY;


async function fetchCategories() {
  try {
    const res = await axios.get(`${API_URL}/categories`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      params: { size: 100 } // henter opp til 100 kategorier
    });
    const categories = res.data.data;
    console.log("Alle kategorier:");
    categories.forEach(c => {
      console.log(`ID: ${c.id} - Navn: ${c.name}`);
    });
  } catch (err) {
    console.error("Feil:", err.message);
  }
}

fetchCategories();
