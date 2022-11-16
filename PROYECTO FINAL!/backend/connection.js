const mongoose = require("mongoose");
const user = "MarinaV";
const passwd = "contramongo";
const database = "proyectofinal";
const connectionString = `mongodb+srv://MarinaV:contramongo@cluster0.dw5itio.mongodb.net/proyectofinal?retryWrites=true&w=majority`;

const url = "mongodb+srv://MarinaV:contramongo@cluster0.dw5itio.mongodb.net/proyectofinal?retryWrites=true&w=majority";
mongoose.set("strictPopulate", false);
mongoose
.connect(connectionString)
.then(() => {
console.log("Hemos Conectado de forma correcta");
})
.catch((err) => {
console.error(err);
});