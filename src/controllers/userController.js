import {UserService}  from '../services/userService.js';

export class UserController{

static getAllUsers = (req, res) => {
   try{
    const users = UserService.getAllUsers();
    if(users.length ===o)
        return res.status(200).json({meessage: "No hay datos disponibles"});

    res.status(200).json({message: "Listado de usuarios", payload: users});
   }catch(error){
    res
        .status(500)
        .json({message: "Error interno del servidor", error: error.message});
   }
   }

   static createUser = (req, res) => {
    const {name, email, password} = req.body;

    try{
        if(!name || !email || !password){
            return res.status(200).json({message: "Todos los campos son obligatorios"});
        }
        const newUser = UserService.createUser({name, email, password});
        console.log(newUser);
        res.status(201).json({message: "Usario creado con exito", payload: newUser});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

static getUsersByEmail = async (req, res) => {
    const {email} = req.body;
    try{
        if(!email){
            return res.status(400).json({message: "El email es obligatorio"});
        }
        const user = await UserService.getUsersByEmail(email);
        if(!user){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        res.status(200).json({message: "Usuario encontrado", payload: user});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
static comparePassword = async (req, res) => {
    const {password} = req.body;
    try{
        if(!password){
            return res.status(400).json({message: "La contraseña es obligatoria"});
        }
        const isValid = await UserService.comparePassword(password);
        if(!isValid){
            return res.status(401).json({message: "Contraseña incorrecta"});
        }
        res.status(200).json({message: "Contraseña correcta"});
    }catch(error){
        res.status(500).json({message: error.message});
    }

}
}


