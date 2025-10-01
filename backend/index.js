// index.js
import { fetchAndStoreProducts } from './kassalappenService.js'

async function main() {
  console.log("🚀 Starter import fra Kassalappen...")
  await fetchAndStoreProducts()
  console.log("✅ Ferdig!")
}

main()
