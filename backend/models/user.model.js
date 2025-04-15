import mongoose from 'mongoose'

// Create a separate connection to the `Authentication` database
const authenticationDB = mongoose.connection.useDb('Authentication'); 

const userCredentialsSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps: true // ensure there's a createdAt and updatedAt fields
});

const User = authenticationDB.model('User Credential', userCredentialsSchema); 

export default User;