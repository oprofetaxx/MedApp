import express from "express";
import pkg  from "body-parser";
import router from "./routes/router.js";  // Certifique-se de que o caminho do arquivo está correto
import db from "./database/database.js";
import cors from "cors";

const app = express();
const { json, urlencoded } = pkg;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());



app.use("/", router);  // Aqui estamos configurando o prefixo "/api" para todas as rotas

app.listen(3001, function() {
    console.log("Listening to port 3001");
});
