import { User } from "../models/user.model.js";

async function createUser({firstName, lastName, email, password}){
    if(!firstName || !email|| !password){
        throw new Error("All fields are required");
    }
    
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new Error("Email already exists");
    }

    const user = await User.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
    })
    return user;
}


export {createUser}
