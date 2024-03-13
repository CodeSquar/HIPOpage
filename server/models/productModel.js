const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
      type: Number,
      required: true
  },
  description:{
    type:String,
    required:true
  },
  discountPercentage: {
    type: Number,
    min: 0,  // Asegura que no sea un valor negativo
    max: 100 // Asegura que no sea mayor al 100%
},
  finalPrice:{
    type: Number,
    required:true
  },
  images:{
        type:Array,
        required:false,
  },
  category: {
      type: String, // O puedes usar un tipo de referencia si tienes una colección de categorías
      required: false
  },
  quantityAvailable: {
      type: Number,
      required: true
  },
  weight: {
      type: Number,
      required: false
  },
 
  },{timestamps:true});
  

  ProductSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('product', ProductSchema, 'products');