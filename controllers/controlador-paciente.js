const PacienteService = require("../services/servicio-paciente");

exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await PacienteService.getPacientes();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getPacienteById = async (req, res) => {
    try {
        const paciente = await PacienteService.getPacienteById(req.params.id, req.role, req.userId);
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.createPaciente = async (req, res) => {
    try {
        const paciente = await PacienteService.createPaciente({
            ...req.body,
            userId: req.user.uuid
        });
        res.status(201).json(paciente);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.updatePaciente = async (req, res) => {
    try {
        await PacienteService.updatePaciente(req.params.id, req.body, req.role, req.userId);
        res.status(200).json({ msg: "El paciente se actualizó correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.deletePaciente = async (req, res) => {
    try {
        await PacienteService.deletePaciente(req.params.id, req.role, req.userId);
        res.status(200).json({ msg: "Paciente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
