import express from "express";
const router = express.Router();
import { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } from '../controllers/usuarioController.js'
import checkAuth from "../middleware/checkAuth.js"

// Autenticación, Registro y confirmación de Usuarios
router.post('/', registrar ); //Crea un nuevo usuario
router.post('/login', autenticar); //Para hacer login en la app
router.get('/confirmar/:token', confirmar); //Para confirmaciones con el token dinámico
router.post('/olvide-password', olvidePassword); //Para hacer login en la app
// Si necesitamos la misma ruta pero funciones diferentes dependiendo si la llamada es get o post
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);
router.get('/perfil', checkAuth, perfil)

export default router;
