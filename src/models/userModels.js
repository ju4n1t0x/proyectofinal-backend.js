
import {db} from '../config/dotEnv.js';
import {collection, getDocs, addDoc, query, where} from 'firebase/firestore';
import bcrypt from 'bcrypt';


export class User{
    constructor(id, name, email, password){
        this.id = id,
        this.name = name,
        this.email = email,
        this.password = password
    }

    static usersCollection = collection(db, 'users');

    static getAllUsers = async () => {
        const getAllUsers = await getDocs(usersCollection);
        const users = getAllUsers.docs.map(doc => ({id: doc.id, ...doc.data}));
        return users;
    };

    static createUser = async (user) => {
        
        if(!user.email || typeof user.email  !== 'string') throw new Error('El email del usuario es invalido');
        if(user.email.length < 5) throw new Error('El email del usuario debe tener al menos 5 caracteres');
        if(!user.email.includes('@')) throw new Error('El email del usuario debe contener un @');

        if(!user.password || typeof user.password !== 'string') throw new Error('La contraseña del usuario es invalida');
        if(user.password.length < 6) throw new Error('La contraseña del usuario debe tener al menos 6 caracteres');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const userToCreate = {
            name: user.name,
            email: user.email,
            password: hashedPassword
        };

        const newUser = await addDoc(this.usersCollection, userToCreate);
        return {id: newUser.id, ...userToCreate};
    };

    static getUsersByEmail = async (email) =>{
        const q = query(this.usersCollection, where("email", "==", email));
        const getUsersByEmail = await getDocs(q);

        if(getUsersByEmail.empty) {
            return null;
        }
        const users = getUsersByEmail.docs[0];
        return {id: users.id, ...users.data()};
    }
    
};
