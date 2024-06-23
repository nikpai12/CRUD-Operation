const mongoose = require('mongoose'); // Mongoose for MongoDB interactions


const DATABASE = `cec`;
const COLLECTION = `users`;

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/'+DATABASE).then(() =>  console.log('Connected to MongoDB'));


// Defining a schema for the 'User' model
// A user has a 'name' and an 'age', both fields are required
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Creating a model for the 'User' schema
const User = mongoose.model(COLLECTION, userSchema);


// 3. DELETE query

//User.create({name: 'John', age: 25}).then((result) => { console.log(result);});
//User.create({name: 'Jane', age: 30}).then((result) => { console.log(result);});
//User.create({name: 'Doe', age: 60}).then((result) => { console.log(result);});

// Deleting the user with the name 'John'
//User.deleteOne({name: 'John'}).then((result) =>  console.log(result));

// Deleting the user with the name 'Jane'
//User.deleteOne({name: 'Jane'}).then((result) =>  console.log(result)); 

// Delete one person Age 30

//User.deleteOne({age: 30}).then((result) =>  console.log(result));

// Deleting users with age greater than 40
User.deleteMany({age: {$gt: 40}}).then((result) =>  console.log(result));
