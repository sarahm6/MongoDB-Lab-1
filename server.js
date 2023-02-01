const express = require('express');
const mongoose = require('mongoose');


// allows us to use information from .env in this file
require('dotenv').config()

// import MyFruit object from fruit.js
const MyVeggie = require('./models/veggies')

let veggies = ['carrot', 'broccoli']
// create app by calling express function
const app = express();


// parses (makes readable) string JSON back into actual objects found in req.body
app.use(express.json());

// allow use of queries in URL (?limit=2&color=green) 
// extended allows nested objects in URL
app.use(express.urlencoded({extended:true}));

// tells express to serve our public folder by default when someone makes a request to this port
app.use(express.static('public'));

// string we get from MongoDB - we hide our username and password in our .env file
let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.6pmvhu8.mongodb.net/FoodDatabase?retryWrites=true&w=majority`;

// by default mongoose 'strictQuery' is true (strict) meaning we cant ask for information not in our schema
// see more here: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);
// connect to our MongoDB database (our Models specify which collections)
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
// function will activate once to let us know we are connected
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

app.post('/create_veggie', async (req, res) =>{
    // destructuring - see more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // renaming variable while destrucutring: https://wesbos.com/destructuring-renaming
    const {nameString: name, colorString: color, ageNumber: age, readyBool: readyToEat} = req.body;

    // Model methods usually give us a promise, so we can wait for the response
    let returnedValue = await MyVeggie.create({
        name,
        color,
        age,
        readyToEat
    });
    console.log(returnedValue);
    if (returnedValue) {
        console.log("upload complete");
    }
    res.send(returnedValue);

})


app.post('/update_veggie', async (req, res) => {
    console.log(req.body);
   let response = await MyVeggie.findByIdAndUpdate(req.body.id, {name: req.body.newName}, {new: true})
   console.log("response from collection", response);
    res.json(response)

})




app.get("/getspecificproduct/:product_id", async (req, res) => {
    console.log("get specific product route");
    // let id = req.params.product_id;
    // let response = await Product.findById(id);
    // console.log(response);
    // console.log(id);
    // // send to front end
    res.json(response);
  })




// app.get('/get_data', (req, res) => {
//     // Get data from MonogoDB,
//     // res.json(data)
//     // res.setHeader('Content-Type', 'application/json');

//     console.log("request received at /get_data");
//     console.log(process.env.MONGOPASSWORD);
//     res.json({data: "Response from server"})
// })
// frontend: fetch('http://localhost:5000/create_fruit/${id}')
// params
app.post('/create_veggie/:veggieId', (req, res) => {
    let id = req.params.veggieId
})

// queries
// frontend: fetch(`http://localhost:5000/create_fruit/?idOfVeggie=${id}`)
app.post('/create_veggie', (req, res) => {
    let id = req.query.idOfVeggie
})

app.delete("/delete_nameless_data", async (req, res) => {
   let response = await MyVeggie.deleteMany({name: ""});

   console.log(response);

   res.send({data: `deleted ${response.deletedCount} items.`})
})

app.get('/get_food_data', async (req, res) => {
    // get data from database
    let response = await MyVeggie.find({});
    console.log(response);
    // send it back to front end
    res.json(response)

})

app.get('/get_single_veggie_using_id/:idOfVeggie', async (req, res) => {
    // usually from the front end (req.body.theId) // req.body.params.id // req.query.VeggieId
    let id = req.params.idOfFruit;

    let response = await MyVeggie.findById(id);
    console.log(response);
    res.send(response);
})

// Create the following routes in server.js
// '/create_veggie' - this route will get information from the front end and create a new Veggie in the collection
// '/veggies' - this route will get all Veggie objects from the database and send them to the front end
// '/veggie/:veggieName' - this route will take the veggieName and get that specific veggie from the database and send it to the front end to be displayed