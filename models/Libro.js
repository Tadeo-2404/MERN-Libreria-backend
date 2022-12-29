import mongoose from 'mongoose';
import generateISBN from '../helpers/generateISBN.js';
const { Schema } = mongoose;

const libroSchema = new Schema({
    ISBN: {
        type: String,
        default: generateISBN()
    },
    titulo: {
        type: String,
        require: true
    },
    autor: {
        type: String,
        require: true
    },
    editorial: {
        type: String,
        require: true
    },
    fecha: {
        type: String,
        require: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    }
});

libroSchema.pre("save", async function(next) {

    if(!this.isModified("ISBN")) {
        next();
    }

   const nuevoISBN = await generateISBN();
   this.ISBN =  nuevoISBN;
})

const Libro = mongoose.model('Libro', libroSchema);
export default Libro;