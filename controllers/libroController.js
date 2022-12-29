import Libro from "../models/Libro.js";

const agregarLibro = async (req, res) => {
    const libro = new Libro(req.body);
    libro.cliente = req.cliente._id;

    try {
        const cliente = await libro.save();
        res.json(cliente)
    } catch (error) {
        console.log(error)
    }
}

const obtenerLibros = async (req, res) => {
    const libros = await Libro.find().where('cliente').equals(req.cliente);
    res.json(libros);
};

const obtenerLibro = async (req, res) => {
    const { id } = req.params;
    const libro = await Libro.findById(id);

    if(libro.cliente._id.toString() != req.cliente._id.toString() ) {
       return res.json({msg: "Accion no valida"})
    }

    if(libro) {
        res.json(libro);
    }  else {
        const error = new Error("el libro no ha sido encontrado");
        res.status(404).json({msg: error.message});
    }
}

const actualizarLibro = async (req, res) => {
    const { id } = req.params;
    const libro = await Libro.findById(id);

    if(!libro) {
        return res.status(404).json({msg: 'el libro no ha sido encontrado'});
    }

    if(libro.cliente._id.toString() !== req.cliente._id.toString() ) {
        const error = new Error("Accion no valida");
        return res.status(400).json({msg: error.message});
    }

    //actulizar
    libro.titulo = req.body.titulo || libro.titulo;
    libro.autor = req.body.autor || libro.autor;
    libro.editorial = req.body.editorial || libro.editorial;
    libro.año = req.body.año || libro.año;

    try {
        const libroNuevo = await libro.save();
        res.json(libroNuevo);
    } catch (error) {
        const e = new Error(error);
        return res.status(400).json({msg: e.message});
    }
}

const eliminarLibro = async (req, res) => {
    const { id } = req.params;
    const libro = await Libro.findById(id);

    if(!libro) {
        const error = new Error("el libro no ha sido encontrado");
        return res.status(400).json({msg: error.message});
    }

    if(libro.cliente._id.toString() !== req.cliente._id.toString() ) {
        const error = new Error("Accion no valida");
        return res.status(400).json({msg: error.message});
    }

    try {
        await libro.deleteOne();
        res.json({msg: 'el libro se ha eliminado correctamente'})
    } catch (error) {
        const e = new Error(error);
        return res.status(400).json({msg: e.message});
    }
}

export {
    agregarLibro, 
    actualizarLibro, 
    obtenerLibro, 
    obtenerLibros,
    eliminarLibro
}