const router = require("express").Router();
const servicesProducts = require("../services/servicesProducts");

router.get("/search", async (req, res) => {
  const { brand, color, price, page } = req.query;
  let docs = [];

  if (brand && color && price) {
    docs = await servicesProducts.getProductsBrandColorPrice(brand, color, price, page);
  } else if (brand && color) {
    docs = await servicesProducts.getProductsBrandColor(brand, color, page);
  } else if (brand && price) {
    docs = await servicesProducts.getProductsBrandPrice(brand, price, page);
  } else if (color && price) {
    docs = await servicesProducts.getProductsColorPrice(color, price, page);
  } else if (color) {
    docs = await servicesProducts.getProductsColor(color, page);
  } else if (brand) {
    docs = await servicesProducts.getProductsBrand(brand, page);
  } else if (price) {
    docs = await servicesProducts.getProductsPrice(price, page);
  } else {
    docs = await servicesProducts.getAllProducts(page);
  }

  if (docs.totalDocs !== 0) {
    const { page, totalPages } = docs;
    docs = docs.docs.map((elem) => {
      const { name, color, price } = elem;
      return { name, color, price };
    });
    res.json({ page, totalPages, products: docs }).status(200).end();
  } else {
    res.json({ result: "No existen resultados" }).status(404).end();
  }
});

module.exports = router;
