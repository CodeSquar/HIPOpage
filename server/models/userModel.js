const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required:true
  },
  cart: [{
    id: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  isAdmin:{
    type:Boolean,
    required:true,
    default:false
  }
  },{timestamps:true});

UserSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('users',UserSchema);