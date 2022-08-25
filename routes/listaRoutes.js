import  express  from "express";
import checkAuth from "../middleware/checkAuth.js"
import {
    agregarLista,
    obtenerLista,
    actualizarLista,
    eliminiarLista,
    cambiarEstado,
} from "../controllers/listaController.js";

const router = express.Router();

router.post('/', checkAuth, agregarLista);
router.route('/:id').get(checkAuth, obtenerLista).put(checkAuth, actualizarLista).delete(checkAuth, eliminiarLista);
router.post('/estado/:id', checkAuth, cambiarEstado);

export default router;