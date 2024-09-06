const HistoriaRepo = require('../repository/repositorio-historia-clinica');
const Paciente = require('../models/modelo-paciente');
const { Op } = require('sequelize');

exports.getHistorias = async () => {
    return await HistoriaRepo.getHistorias();
};

exports.getHistoriaById = async (id, role, userId, pacienteId) => {
    const historia = await HistoriaRepo.getHistoriaById(id);
    if (!historia) throw new Error("No se encontró la historia clínica");

    if (role !== "doctor" && role !== "admin") {
        if (userId !== historia.userId || pacienteId !== historia.pacienteId) {
            throw new Error("Acceso prohibido");
        }
    }
    return historia;
};

exports.createHistoria = async (data) => {
    const { pacienteUuid } = data;

    const paciente = await Paciente.findOne({ where: { uuid: pacienteUuid } });
    if (!paciente) throw new Error("Paciente no encontrado");

    return await HistoriaRepo.createHistoria({
        pacienteId: paciente.id,
        ...data
    });
};

exports.updateHistoria = async (id, data, role, userId) => {
    const historia = await HistoriaRepo.getHistoriaById(id);
    if (!historia) throw new Error("No se encontró la historia clínica");

    if (role !== "doctor" && role !== "admin" && userId !== historia.userId) {
        throw new Error("Acceso prohibido");
    }

    return await HistoriaRepo.updateHistoria(id, data);
};

exports.deleteHistoria = async (id, role, userId) => {
    const historia = await HistoriaRepo.getHistoriaById(id);
    if (!historia) throw new Error("No se encontró la historia clínica");

    if (role !== "doctor" && role !== "admin" && userId !== historia.userId) {
        throw new Error("Acceso prohibido");
    }

    return await HistoriaRepo.deleteHistoria(id);
};
