const express = require('express');
const {
    getPacientes,
    getPacienteById,
    createPaciente,
    updatePaciente,
    deletePaciente
} = require('../controllers/controlador-paciente');

const { verificarToken } = require('../middleware/autenticacion-usuario');

const router = express.Router();

router.get('/pacientes', verificarToken, getPacientes);
router.get('/pacientes/:id', verificarToken, getPacienteById);
router.post('/pacientes', verificarToken, createPaciente);
router.patch('/pacientes/:id', verificarToken, updatePaciente);
router.delete('/pacientes/:id', verificarToken, deletePaciente);

module.exports = router;
