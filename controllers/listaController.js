import Proyecto from "../models/Proyecto.js";
import Lista from "../models/Lista.js";


const agregarLista = async (req, res) => {
    const { proyecto } = req.body;
    const existeProyecto = await Proyecto.findById(proyecto);

    if(!existeProyecto){
        const error = new Error('El proyecto no existe');
        return res.status(404).json({ msg: error.message })
    }

    if(existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No tienes permiso para agregar listas');
        return res.status(404).json({ msg: error.message })
    } 

    try {
        const listaAlmacenada = await Lista.create(req.body);
        res.json(listaAlmacenada)
    } catch (error) {
        console.log(error)
    }
};

const obtenerLista = async (req, res) => {
    // saber la tarea
    // const { id } = req.params;
    // const tarea = await Tarea.findById(id);
    // saber el proyecto
    // const { proyecto } = tarea
    // const existeProyecto = await Proyecto.findById(proyecto)

    // con "populate" podemos saber la tarea y el proyecto (proyecto está contenido en tarea)
    const { id } = req.params;
    try {
        const lista = await Lista.findById(id).populate("proyecto");
        if(!lista){
            const error = new Error('La Lista no existe');
            return res.status(404).json({ msg: error.message });
        }
        if (lista.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no válida');
            return res.status(403).json({ msg: error.message });
        } 
        res.json(lista);
    } catch (error) {
        const errore = new Error('La Lista no se encuentra');
        return res.status(404).json({ msg: errore.message });
    } 
};

const actualizarLista = async (req, res) => {
    const { id } = req.params;
    try {
        const lista = await Lista.findById(id).populate("proyecto");
        if(!lista){
            const error = new Error('La Lista no existe');
            return res.status(404).json({ msg: error.message });
        }
        if (lista.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no válida');
            return res.status(403).json({ msg: error.message });
        } 
        lista.nombre = req.body.nombre || lista.nombre;
        lista.descripcion = req.body.descripcion || lista.descripcion;
        lista.prioridad = req.body.prioridad || lista.prioridad;
        lista.fechaEntrega = req.body.fechaEntrega || lista.fechaEntrega;

        try {
            const listaAlmacenada = await lista.save();
            res.json(listaAlmacenada)
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        const errore = new Error('La lista no se encuentra');
        return res.status(404).json({ msg: errore.message });
    } 
};

const eliminiarLista = async (req, res) => {
    const { id } = req.params;
    try {
        const lista = await Lista.findById(id).populate("proyecto");
        if(!lista){
            const error = new Error('La lista no existe');
            return res.status(404).json({ msg: error.message });
        }
        if (lista.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no válida');
            return res.status(403).json({ msg: error.message });
        } 

        try {
            await lista.deleteOne();
            res.json({ msg: "lista Eliminada" })
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        const errore = new Error('La lista no se encuentra');
        return res.status(404).json({ msg: errore.message });
    } 
    
};

const cambiarEstado = async (req, res) => {
    
};

export{
    agregarLista,
    obtenerLista,
    actualizarLista,
    eliminiarLista,
    cambiarEstado,
}