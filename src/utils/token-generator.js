import jwt from "jsonwebtoken";




//funcion para generar un token JWT
export const generateToken = (userData) => {
    const secret_key = process.env.JWT_SECRET_KEY;
    if (!secret_key) {
        throw new Error("JWT Key no se encuentra definida en las variables de entorno");
    }
    const user = {id: userData.id, email: userData.email};
    const expiration = {expiresIn:'1h'};
    return jwt.sign(user, secret_key, expiration);
}
