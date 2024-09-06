const express = require('express');
const {
    obtenerUsuario,
    obtenerUsuarioId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/controlador-usuario');

const { verificarToken, adminOnly } = require('../middleware/autenticacion-usuario');

const router = express.Router();

router.get('/users', verificarToken,adminOnly, obtenerUsuario);
router.get('/users/:id', verificarToken,adminOnly, obtenerUsuarioId);
router.post('/users', verificarToken,adminOnly, crearUsuario);
router.patch('/users/:id', verificarToken,adminOnly, actualizarUsuario);
router.delete('/users/:id', verificarToken,adminOnly, eliminarUsuario);

module.exports = router;

