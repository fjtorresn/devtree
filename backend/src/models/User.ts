import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    handle: string;
    name: string;
    email: string;
    password: string;
    description: string
}

const userSchema = new Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: "",
        trim: true,
        lowercase: true
    }
})

const User = mongoose.model<IUser>('User', userSchema);
export default User;