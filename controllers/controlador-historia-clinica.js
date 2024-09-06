const HistoriaService = require("../services/servicio-historia-clinica");

exports.getHistorias = async (req, res) => {
    try {
        const historias = await HistoriaService.getHistorias();
        res.status(200).json(historias);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.getHistoriaById = async (req, res) => {
    try {
        const historia = await HistoriaService.getHistoriaById(req.params.id, req.role, req.userId, req.pacienteId);
        res.status(200).json(historia);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.createHistoria = async (req, res) => {
    try {
        const historia = await HistoriaService.createHistoria(req.body);
        res.status(201).json(historia);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.updateHistoria = async (req, res) => {
    try {
        await HistoriaService.updateHistoria(req.params.id, req.body, req.role, req.userId);
        res.status(200).json({ msg: "Historia clínica actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.deleteHistoria = async (req, res) => {
    try {
        await HistoriaService.deleteHistoria(req.params.id, req.role, req.userId);
        res.status(200).json({ msg: "Historia clínica eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
