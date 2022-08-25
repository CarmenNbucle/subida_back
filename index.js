// en vez de poner: "const express = require("express");" --> se puede hacer porque se ha añadido a packege.json ""type": "module","
import express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import listaRoutes from "./routes/listaRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
conectarDB();

//Configurar CORS (withelist)
// const whiteList = [process.env.FRONTEND_URL];
 
// const corsOptions= {
//     origin: function (origin, callback) {
//         console.log(origin)
//         if(whiteList.includes(origin)){
            
//             callback(null, true) //dándole acceso a la API
            
//         }else{
//             callback(new Error("Error cogido en las cors (index.js)"))
//         }
//     }
// };
 
// app.use(cors(corsOptions));

app.use(cors());


//Cabeceras para CORS
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/lista", listaRoutes);

// app.get("/", (req, res) => {
//     res.send("Holaaaaa!")
// })

const PORT = process.env.PORT || 4000;

// lanzar el servidor
app.listen(PORT, () => {
    console.log(`Servidor lanzado por Carmen en el puerto ${PORT}`)
})