const mongoose = require('mongoose');

// Schemas are the structure of our data, and the data types
// Data Types: https://mongoosejs.com/docs/schematypes.html
const veggieSchema = new mongoose.Schema({
    name: String,
    color: String,
    age: Number,
    readyToEat: Boolean
})

// We make a model from our Schema and point it at the collection we want
// we can the use the model to create, read, update, and delete data in that collection
const MyVeggie = mongoose.model('MyVeggie', veggieSchema)
//myveggies


module.exports = MyVeggie;
