const PacienteRepo = require('../repository/repositorio-paciente');
const { Op } = require('sequelize');

exports.getPacientes = async () => {
    return await PacienteRepo.getPacientes();
};

exports.getPacienteById = async (id, role, userId) => {
    const paciente = await PacienteRepo.getPacienteById(id);
    if (!paciente) throw new Error("No se encontró el paciente");

    if (role !== "admin") {
        if (paciente.userId !== userId) {
            throw new Error("Acceso prohibido");
        }
    }
    return paciente;
};

exports.createPaciente = async (data) => {
    if (!data.name || !data.tipoDocumentoIdentificacion || !data.numDocumentoIdentificacion ||
        !data.fechaNacimiento || !data.codSexo || !data.codPaisResidencia || !data.codMunicipioResidencia) {
        throw new Error("Todos los campos son requeridos");
    }

    return await PacienteRepo.createPaciente(data);
};

exports.updatePaciente = async (id, data, role, userId) => {
    const paciente = await PacienteRepo.getPacienteById(id);
    if (!paciente) throw new Error("No se encontró el paciente");

    if (role !== "admin" && paciente.userId !== userId) {
        throw new Error("Acceso prohibido");
    }

    return await PacienteRepo.updatePaciente(paciente.id, data);
};

exports.deletePaciente = async (id, role, userId) => {
    const paciente = await PacienteRepo.getPacienteById(id);
    if (!paciente) throw new Error("No se encontró el paciente");

    if (role !== "admin" && paciente.userId !== userId) {
        throw new Error("Acceso prohibido");
    }

    return await PacienteRepo.deletePaciente(paciente.id);
};
