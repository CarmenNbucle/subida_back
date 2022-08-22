import express from 'express';
import { 
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
//    obtenerTareas,
} from '../controllers/proyectoController.js';
import checkAuth from '../middleware/checkAuth.js';


const router = express.Router();

router.route('/').get(checkAuth, obtenerProyectos).post(checkAuth, nuevoProyecto);
router.route('/:id').get(checkAuth, obtenerProyecto).put(checkAuth, editarProyecto).delete(checkAuth, eliminarProyecto);
//router.route('/tareas/:id').get(checkAuth, obtenerTareas);
router.route('/agregar-colaborador/:id').post(checkAuth, agregarColaborador);
router.route('/eliminar-colaborador/:id').post(checkAuth, eliminarColaborador);




export default router