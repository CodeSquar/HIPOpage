const jwt = require('jsonwebtoken');

const userInfo = (req, res, next) => {
  // Obtener el token desde los encabezados de la solicitud
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado.' });
  }

  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, "lol");

    // Agregar la información del usuario al objeto req para que esté disponible en rutas subsiguientes
    req.userInfo = decodedToken;

    // Continuar con la siguiente función de middleware o ruta
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(401).json({ success: false, message: 'Token no válido.' });
  }
};

module.exports = userInfo;
