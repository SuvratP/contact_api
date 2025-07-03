import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
    CreatedAt:{type:Date, default:Date.now},
})
export const User = mongoose.model("User",UserSchema) 