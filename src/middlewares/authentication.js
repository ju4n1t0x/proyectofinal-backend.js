import jwt from "jsonwebtoken";


const secret_key = process.env.JWT_SECRET_KEY;

export const authentication = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({message: 'Acceso no autorizado. Se requiere token Barer.'});
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret_key, (err, user) =>{
          if (err) {
                return res.status(403).json({message: 'Token no valido o expirado.'});

            }
            req.user = user;

            next();
        });
    }
   