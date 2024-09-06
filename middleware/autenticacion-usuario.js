const jwt = require('jsonwebtoken');
const repositorioUsuario = require('../repository/repositorio-usuario');

// Middleware para verificar el token JWT
exports.verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
      return res.status(403).json({ msg: 'No tiene un token generado' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Asignamos la información del token decodificado
      next();
  } catch (error) {
      res.status(401).json({ msg: 'Token inválido o expirado' });
  }
};

// Middleware para verificar si el usuario es admin
exports.adminOnly = async (req, res, next) => {
  try {
    // Verificamos que el token haya sido decodificado por verificarToken
    if (!req.user) {
      return res.status(401).json({ msg: 'Token no verificado' });
    }

    // Buscamos al usuario por su ID (asignado por verificarToken)
    const user = await repositorioUsuario.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'No existe ese usuario' });
    }

    // Verificamos que el rol del usuario sea 'admin'
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Acceso prohibido. No es administrador' });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};