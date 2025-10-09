import { fetchProducts } from "../../../backend/kassalappenService.js";

export default async function handler(req, res) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    console.log(" Starter import fra Kassalappen...");
    await fetchProducts();
    console.log("Ferdig!");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Feil:", error);
    res.status(500).json({ error: error.message });
  }
}
