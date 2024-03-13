const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const SalesSchema = new mongoose.Schema({
    mpId:{
        type:String,
        required:true
    },
    saleState:{
        type:String,
        required:true
    }
  },{timestamps:true});

SalesSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('sales',SalesSchema);