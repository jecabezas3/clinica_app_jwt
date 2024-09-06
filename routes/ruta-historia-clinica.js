const express = require('express');
const {
    getHistorias,
    getHistoriaById,
    createHistoria,
    updateHistoria,
    deleteHistoria
} = require('../controllers/controlador-historia-clinica');

const { verificarToken } = require('../middleware/autenticacion-usuario');

const router = express.Router();

router.get('/historias', verificarToken, getHistorias);
router.get('/historias/:id', verificarToken, getHistoriaById);
router.post('/historias', verificarToken, createHistoria);
router.patch('/historias/:id', verificarToken, updateHistoria);
router.delete('/historias/:id', verificarToken, deleteHistoria);

module.exports = router;
