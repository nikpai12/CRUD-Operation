
![MongoDB Logo](https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png)

# A Workshop on Mongoose and MongoDB


[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

This repository contains the code for a workshop on Mongoose and Express JS. The workshop covers the following topics:



## Table of Contents

- [Installation](#installation)
- [License](#license)

## Installation

To get started with the workshop, follow these steps:

1. Clone this repository to your local machine. Open your terminal and run the following command:

    - Link to Donload Git: [Git](https://git-scm.com/downloads)

    ```bash
    git clone https://github.com/adithyapaib/mongocec
    ```
    - Configure the git user name and email using the following commands:
    ```bash
    git config --global user.name "Your Name"
    git config --global user.email "adithy@email.com"
    ```

    Install MongoDB on your local machine. You can download the installer from the following link:
    [MongoDB](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.11-signed.msi)

2. Navigate to the project directory:

    ```bash
    cd mongocec
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Install Nodemon globally:

    ```bash
    npm install -g nodemon
    ```
4. Start the application:

    ```bash
   nodemon index.js
    ```
5. Open your browser and navigate to `http://localhost:3000/` to see the application in action.


## CODE USED FOR SECTION 1 
- index.js

```javascript
const mongoose = require('mongoose'); // Mongoose for MongoDB interactions


const DATABASE = `cec`;
const COLLECTION = `users`;

// Connecting to MongoDB
// The database is located at localhost:27017 and the database name is 'test'
mongoose.connect('mongodb://localhost:27017/cec').then(() =>  console.log('Connected to MongoDB'));



// Defining a schema for the 'User' model
// A user has a 'name' and an 'age', both fields are required
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});


// Creating the 'User' model using the 'userSchema'
// The collection in the MongoDB database will be 'test'
const User = mongoose.model(COLLECTION, userSchema);

//1. CREATE OPERATION
// Creating a new user using Create method
User.create({ name: 'John Doe', age: 25 }).then((user) => console.log(user))


// Creating a new user using Save method

const adithya = new User({ name: 'Adithya',age: 22});
adithya.save()

```
### ACTIVITY 1

- Create a new Collection activity in the MongoDB database
- Create a new Schema for the activity
- Create a new Model for the activity
- Create a new activity using the Create method



## License

This project is licensed under the MIT license. Please see the [LICENSE](LICENSE) file for more information.




