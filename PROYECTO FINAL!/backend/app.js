const url = "mongodb+srv://MarinaV:contramongo@cluster0.dw5itio.mongodb.net/proyectofinal?retryWrites=true&w=majority";

const mongoose = require('mongoose');
const express = require("express");
const app = express();
// const config = require("./modules/config");
const routerManufacters = require("./routes/routesManufacters");
const routerProducts = require("./routes/routesProducts");
// const router = express.Router();
const hostname = "localhost";
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use("/manufacters", routerManufacters);
app.use("/products", routerProducts);

async function inicio() {
  await mongoose.connect(url);
  console.log('Conexión establecida con la BBDD.');
  
  app.listen(port, hostname, () => {
    console.log(`Servidor levantado con éxito en http://${hostname}:${port}`);
  })
}

inicio();