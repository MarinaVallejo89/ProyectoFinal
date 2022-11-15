const mongoose = require('mongoose');
const url = "mongodb+srv://MarinaV:contramongo@cluster0.dw5itio.mongodb.net/proyectofinal?retryWrites=true&w=majority";

const Product = require('./schemas/Product-schema');
const Manufacturer = require('./schemas/Manufacturer-schema');
const products = require('./data/products');
const manufacturers = require('./data/manufacturers');

const createdb = async () => {
    const db = await mongoose.connect(url);

    await Product.deleteMany({});
    await Manufacturer.deleteMany({});

    const newManufacturers = await Manufacturer.insertMany(manufacturers);

    const newProducts = products.map( product => {
        const manufacturer = newManufacturers.filter(
            manufacturer => manufacturer.cif === product.manufacturer)[0];
        const { _id, name } = manufacturer;
        return { ...product, manufacturer: { ref: _id, name }
        };
    });
    await Product.insertMany(newProducts);

    db.disconnect();
};

createdb();
