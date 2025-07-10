import {User} from "../models/userModels.js";

export class UserService {
static getAllUsers = async () => {
    return await User.getAllUsers();
};

static createUser = async (user) => {
    return await User.createUser(user);
};

static getUsersByEmail = async (email) => {
    return await User.getUsersByEmail(email);
};



}


    
