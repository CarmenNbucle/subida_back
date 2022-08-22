import mongoose from "mongoose";
import bcrypt from "bcrypt"

const usuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
});

usuarioSchema.pre('save', async function(next){
    // Para no volver a hashear de nuevo el pass por si se producen cambios en algún parámetro del usuario
    // "this" al usar function, se refiere al usuario, con arrow function sería otra cosa
    if(!this.isModified('password')){
        // No es un return que pararía la ejecución, sino que next tiene "next" que salta al siguiente middleware
        next();
    }

    // Creamos el salt (con 10 está más que suficiente) y se lo aplicamos al pass
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    // Mirar si el password está hasheado
    return await bcrypt.compare(passwordFormulario, this.password)
} // retorna true o false

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;


