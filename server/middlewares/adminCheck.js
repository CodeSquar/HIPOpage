const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js'); // Asegúrate de importar el modelo de usuario adecuadamente

const adminCheck = async (req, res, next) => {
  // Obtener el token desde los encabezados de la solicitud
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado.' });
  }

  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, "lol");

    // Verificar si el usuario es un administrador (admin:true)
    if (decodedToken) {
      const user = await User.findById(decodedToken.id); // Asume que el campo de identificación del usuario es userId

      if (user && user.isAdmin === true) {
        // Agregar la información del usuario al objeto req para que esté disponible en rutas subsiguientes
        req.userInfo = decodedToken;

        // Continuar con la siguiente función de middleware o ruta
        next();
      } else {
        return res.status(403).json({ success: false, message: 'Acceso no autorizado para usuarios no administradores.' });
      }
    } else {
      return res.status(403).json({ success: false, message: 'Acceso no autorizado.' });
    }
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(401).json({ success: false, message: 'Token no válido.' });
  }
};

module.exports = adminCheck;