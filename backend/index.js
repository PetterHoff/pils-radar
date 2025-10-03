import { fetchProducts } from './kassalappenService.js'  


async function main() {
  console.log(" Starter import fra Kassalappen...")
  await fetchProducts()
  console.log("Ferdig!")
}

main()
