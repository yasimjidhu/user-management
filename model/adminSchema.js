const mongoose = require('mongoose');
const schema = mongoose.Schema;
// require('./config')
const adminSchema = schema({
    email:{
        type:String,
        required:true
        
    },

    password:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('admin',adminSchema)