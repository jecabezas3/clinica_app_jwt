const Paciente = require("../models/modelo-paciente");
const User = require("../models/modelo-usuario");

exports.getPacientes = async () => {
    return await Paciente.findAll({
        attributes: [
            'uuid', 'name', 'tipoDocumentoIdentificacion', 'numDocumentoIdentificacion',
            'fechaNacimiento', 'codSexo', 'codPaisResidencia', 'codMunicipioResidencia'
        ],
        include: [{
            model: User,
            attributes: ['name', 'email']
        }]
    });
};

exports.getPacienteById = async (id) => {
    return await Paciente.findOne({
        where: { uuid: id }
    });
};

exports.createPaciente = async (data) => {
    return await Paciente.create(data);
};

exports.updatePaciente = async (id, data) => {
    return await Paciente.update(data, {
        where: { id }
    });
};

exports.deletePaciente = async (id) => {
    return await Paciente.destroy({
        where: { id }
    });
};
