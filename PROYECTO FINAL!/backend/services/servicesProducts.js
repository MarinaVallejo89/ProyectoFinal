const Products = require("../models/modelProducts");


const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const getAllProducts = async (page) => {
  return await Products.paginate(
    {},
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getProductsBrandColorPrice = async (brand, color, price, page) => {
  const regex = new RegExp(escapeRegex(brand), "gi");
  return await Products.paginate(
    {
      $and: [{ name: regex }, { color: color }, { price: { $lt: price } }],
    },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getProductsBrandColor = async (brand, color, page) => {
  const regex = new RegExp(escapeRegex(brand), "gi");
  return await Products.paginate(
    {
      $and: [{ name: regex }, { color: color }],
    },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getProductsBrandPrice = async (brand, price, page) => {
  const regex = new RegExp(escapeRegex(brand), "gi");
  return await Products.paginate(
    {
      $and: [{ name: regex }, { price: { $lt: price } }],
    },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getProductsColorPrice = async (color, price, page) => {
  return await Products.paginate(
    {
      $and: [{ color: color }, { price: { $lt: price } }],
    },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getProductsColor = async (color, page) => {
  return await Products.paginate(
    {
      color: color,
    },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getProductsBrand = async (brand, page) => {
  const regex = new RegExp(escapeRegex(brand), "gi");
  return await Products.paginate(
    { name: regex },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getProductsPrice = async (price, page) => {
  return await Products.paginate(
    { price: { $lt: price } },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

module.exports = {
  getAllProducts,
  getProductsBrandColorPrice,
  getProductsBrandColor,
  getProductsBrandPrice,
  getProductsColorPrice,
  getProductsColor,
  getProductsBrand,
  getProductsPrice,
};
