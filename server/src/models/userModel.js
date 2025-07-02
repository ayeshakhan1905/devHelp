const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role : {
        type: String,
        enum: ['student', 'mentor'],
        default: 'student',
        required: true,
    },
},{timestamps: true});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();  
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function(password){
    if(!password){
        throw new error("Password is needed to compare passwords")
    }
    const isMatch = await bcrypt.compare(password , this.password)
    if(!isMatch){
        throw new error("Invalid credentials")
    }
    return true
}

module.exports = mongoose.model('User', userSchema);