import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generateToken from '../helpers/generateToken.js';
const { Schema } = mongoose;

const clienteSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true,
        default: null
    },
    confirmado: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: generateToken()
    }
});

clienteSchema.pre("save", async function(next) {

    if(!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

clienteSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

const Cliente = mongoose.model('Cliente', clienteSchema);
export default Cliente;