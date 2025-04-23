import mongoose ,{ Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
    fullName:{
        firstName:{
            type:String,
            required: true,
            minlength:[3,'First name must be atleast 3 characters long']
        },
        lastName:{
            type:String,
            minlength:[3,'First name must be atleast 3 characters long']
        }
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        minlength:[5,'First name must be atleast 5 characters long'],
    },
    password:{
        type:String,
        required: true,
        minlength:[5,'Password must be atleast 5 characters long'],
        select:false
    },
    socketId:{
        type:String
    },
    completedRides: {
        type: Number,
        default: 0,
    }
},{timestamps: true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    try {
        // Hash the password
        this.password = await bcrypt.hash(this.password, 10);
        next(); // Proceed to save the document
      } catch (error) {
        next(error); // Pass any errors to the next middleware
      }
})
userSchema.methods.comparePassword=async function(password){
       return bcrypt.compare(password,this.password)
}
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,email:this.email}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}



export const User = mongoose.model('User', userSchema);