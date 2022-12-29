import express from 'express';
import { agregarLibro, actualizarLibro, obtenerLibro, obtenerLibros, eliminarLibro } from '../controllers/libroController.js';
import authenticateToken from '../middleware/auth.js';
const router = express.Router();

//privado
router.post('/',authenticateToken, agregarLibro);
router.get('/', authenticateToken, obtenerLibros);

router.get('/:id', authenticateToken, obtenerLibro);
router.put('/:id', authenticateToken, actualizarLibro);
router.delete('/:id', authenticateToken, eliminarLibro);

export default router;
