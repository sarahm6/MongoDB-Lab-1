const express = require('express');
const mongoose = require('mongoose');


// allows us to use information from .env in this file
require('dotenv').config()

// import MyFruit object from fruit.js
const MyFruit = require('./models/fruit')

let fruits = ['apple', 'kiwi']
// create app by calling express function
const app = express();


// parses (makes readable) string JSON back into actual objects found in req.body
app.use(express.json());