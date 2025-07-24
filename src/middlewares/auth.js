import jwt          from 'jsonwebtoken';
import { config }   from "dotenv";

config();


const SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o malformado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    if (!decoded.id) {
      return res.status(400).json({ message: 'Token válido pero sin id en el payload' });
    }

    req.userId = decoded.id; // Guarda el ID en la request
    next();
  } catch (err) {
    console.error('Error al verificar JWT:', err.message);
    return res.status(401).json({ message: 'Token inválido' });
  }
};


