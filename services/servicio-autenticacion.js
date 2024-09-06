// services/AuthService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const repositorioUsuario = require('../repository/repositorio-usuario');

class ServicioAutenticacion {
  async iniciarSesion(email, password) {
    const usuario = await repositorioUsuario.findByEmail(email);
    if (!usuario) {
      throw new Error('No existe ese usuario');
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      throw new Error('Contraseña incorrecta');
    }

    // Generar el token JWT
    const token = jwt.sign({ id: usuario.uuid, role: usuario.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token };
  }

  async perfil(id) {
    const user = await repositorioUsuario.findById(id);
    if (!user) {
      throw new Error('No existe ese usuario');
    }
    return user;
  }
}

module.exports = new ServicioAutenticacion();
