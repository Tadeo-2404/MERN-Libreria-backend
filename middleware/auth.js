import jwt from "jsonwebtoken"
import Cliente from "../models/Cliente.js"

const authenticateToken = async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
          token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          
          req.cliente = await Cliente.findById(decoded.id).select("-password -token -confirmado"); //una vez que el cliente existe, lo asignamos a una variable
          return next(); //le decimos a express que continue
          
        } catch (error) {
            const e = new Error('Token no valido o inexistente');
            res.status(403).json({msg: e.message});
        }
    } 

    next();
}

export default authenticateToken