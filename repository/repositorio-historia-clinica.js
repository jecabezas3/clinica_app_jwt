const Historia = require("../models/modelo-historia-clinica");
const Paciente = require("../models/modelo-paciente");

exports.getHistorias = async () => {
    return await Historia.findAll({
        attributes: [
            'uuid', 'pacienteId', 'fechaConsulta', 'codigoConsulta',
            'motivoConsulta', 'diagnosticoPrincipal', 'diagnosticoSecundario', 'procedimiento'
        ],
        include: [{
            model: Paciente,
            attributes: [
                'name', 'tipoDocumentoIdentificacion', 'numDocumentoIdentificacion',
                'fechaNacimiento', 'codSexo', 'codPaisResidencia', 'codMunicipioResidencia'
            ]
        }]
    });
};

exports.getHistoriaById = async (id) => {
    return await Historia.findOne({
        where: { uuid: id },
        include: [{
            model: Paciente,
            attributes: [
                'name', 'tipoDocumentoIdentificacion', 'numDocumentoIdentificacion',
                'fechaNacimiento', 'codSexo', 'codPaisResidencia', 'codMunicipioResidencia'
            ]
        }]
    });
};

exports.createHistoria = async (data) => {
    return await Historia.create(data);
};

exports.updateHistoria = async (id, data) => {
    return await Historia.update(data, {
        where: { uuid: id }
    });
};

exports.deleteHistoria = async (id) => {
    return await Historia.destroy({
        where: { uuid: id }
    });
};
