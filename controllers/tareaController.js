import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";


const agregarTarea = async (req, res) => {
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);

    if(!existeProyecto){
        const error = new Error('El proyecto no existe');
        return res.status(404).json({ msg: error.message })
    }

    if(existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No tienes permiso para agregar tareas');
        return res.status(404).json({ msg: error.message })
    } 

    try {
        const tareaAlmacenada = await Tarea.create(req.body);
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
};

const obtenerTarea = async (req, res) => {
    // // saber la tarea
    // const { id } = req.params;
    // const tarea = await Tarea.findById(id);
    // // saber el proyecto
    // const { proyecto } = tarea
    // const existeProyecto = await Proyecto.findById(proyecto)

    // con "populate" podemos saber la tarea y el proyecto (proyecto está contenido en tarea)
    const { id } = req.params;
    try {
        const tarea = await Tarea.findById(id).populate("proyecto");
        if(!tarea){
            const error = new Error('La tarea no existe');
            return res.status(404).json({ msg: error.message });
        }
        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no válida');
            return res.status(403).json({ msg: error.message });
        } 
        res.json(tarea);
    } catch (error) {
        const errore = new Error('La tarea no se encuentra');
        return res.status(404).json({ msg: errore.message });
    } 
};

const actualizarTarea = async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await Tarea.findById(id).populate("proyecto");
        if(!tarea){
            const error = new Error('La tarea no existe');
            return res.status(404).json({ msg: error.message });
        }
        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no válida');
            return res.status(403).json({ msg: error.message });
        } 
        
        tarea.nombre = req.body.nombre || tarea.nombre;
        tarea.descripcion = req.body.descripcion || tarea.descripcion;
        tarea.prioridad = req.body.prioridad || tarea.prioridad;
        tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

        try {
            const tareaAlmacenada = await tarea.save();
            res.json(tareaAlmacenada)
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        const errore = new Error('La tarea no se encuentra');
        return res.status(404).json({ msg: errore.message });
    } 
};

const eliminiarTarea = async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await Tarea.findById(id).populate("proyecto");
        if(!tarea){
            const error = new Error('La tarea no existe');
            return res.status(404).json({ msg: error.message });
        }
        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no válida');
            return res.status(403).json({ msg: error.message });
        } 

        try {
            await tarea.deleteOne();
            res.json({ msg: "tarea Eliminada" })
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        const errore = new Error('La tarea no se encuentra');
        return res.status(404).json({ msg: errore.message });
    } 
    
};

const cambiarEstado = async (req, res) => {
    
};

export{
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminiarTarea,
    cambiarEstado,
}