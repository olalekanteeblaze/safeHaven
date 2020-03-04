const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')


const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'Please enter your fullname'],
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email address'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please enter a valid phone number'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },

})
userSchema.methods.generateAuthToken = function (){
    return jwt.sign(
        {
            fullname: this.fullname,
            id: this._id,
            email: this.email,
            phone: this.phone
        },
        config.get('jwtPrivateKey'),
        { expiresIn: 60 * 60 } //1 hour
    )
}

const User = model('User', userSchema)
module.exports = User