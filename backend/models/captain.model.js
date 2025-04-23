import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
const captainSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type: String,
            required: true,
            minlength:[3,'First name must be atleast 3 characters long']
        },
        lastName:{
            type: String,
            minlength:[3,'First name must be atleast 3 characters long']
        }
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength:[5,'Password must be atleast 5 characters long'],
        select: false
    },
    socketId:{
        type: String
    },
    status:{
        type: String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required: true,
            minlength:[3,'color must be at least 3 characters']
        },
        plate:{
            type: String,
            required: true,
            minlength:[5,'plate must be at least 5 characters']
        },
        capacity:{
            type: Number,
            required: true,
            min:[1,'capacity must be at least 1']
        },
       vehicleType:{
            type:String,
            enum:['car','bike','auto'],
            required: true
       },
    },
    location:{
     lat:{
         type: Number     
     },
     lng:{
         type: Number     
     }
    }
})

captainSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        console.log(error)
    }
 })

captainSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id:this._id, email:this.email}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}
captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

export const Captain = mongoose.model('Captain',captainSchema);