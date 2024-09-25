
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    designation:{
      type:String,
      require:true
    },
    gender:{
        type:String,
        require:true
    },
    course:{
        type:String,
        require:true
    },
    profile:{
        profilePhoto:{
            type:String,
            default:""
        }
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
},{timestamps:true});
export const Empolye = mongoose.model('Empolye', userSchema);