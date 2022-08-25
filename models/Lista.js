import mongoose from "mongoose";

const listaSchema = mongoose.Schema({
    piso: {
        type: String,
        trim: true,
        required: true,
    },
    habitaciones: {
        type: Number,
        trim: true,
        required: true,
    },
    tsuperficie: {
        type: String,
        default: false,
    },
    precio: {
        type: String,
        required: true,
    },
    reservado: {
        type: Boolean,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    plano: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    visitas: {
        type: Number,
        required: true,
    },
    proyecto: {
        //llamamos al Schema de proyecto en models > Proyecto.js
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto",
    },
}, {
    timestamps: true
})

const Lista = mongoose.model("Lista", listaSchema);
export default Lista;
