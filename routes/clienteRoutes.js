import express from 'express'
import { registrar, perfil, iniciarSesion, confirmarCuenta, olvidePassword, comprobarToken, nuevoPassword, actualizarPerfil, actualizarPassword } from '../controllers/clienteController.js';
const router = express.Router();
import authenticateToken from '../middleware/auth.js';

//publicas
router.post('/', iniciarSesion);
router.post('/registrarse', registrar);
router.get('/confirmar-cuenta/:token', confirmarCuenta);
router.post('/olvide-password', olvidePassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

//privado
router.get('/perfil', authenticateToken ,perfil);
router.put('/perfil/:id', authenticateToken, actualizarPerfil);
router.put('/cambiar-password', authenticateToken, actualizarPassword);

export default router;