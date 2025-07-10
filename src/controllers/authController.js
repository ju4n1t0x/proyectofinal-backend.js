import {generateToken} from '../utils/token-generator.js';
import {UserService} from '../services/userService.js';
import bcrypt from 'bcrypt';

export class AuthController{

  static async login(req, res) {
    const {email, password} = req.body;

    try {
        const user = await UserService.getUsersByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken({id: user.id, email: user.email});
            res.status(200).json({
                message: "Usuario autenticado con exito",
                payload: {
                    id: user.id,
                    email: user.email,
                    token: token
                }
            });
        } else {
            res.status(401).json({
                message: "Credenciales incorrectas"
            });
        }
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({
            message: "Error interno del servidor",
        });
    }
} 

static async register(req, res) {
    const {name, email, password} = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({message: "Todos los campos son obligatorios"});
        }

        const newUser = await UserService.createUser({name, email, password});
        res.status(201).json({
            message: "Usuario creado con exito",
            payload: {id: newUser.id, email: newUser.email}
        });
    } catch (error) {
        res.status(500).json({message: "Error interno del servidor"});
    }
  }
}