const express =require("express");
const app=express();
const port=80;
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/KingKart', { useNewUrlParser: true, useUnifiedTopology: true });
const path=require("path");

app.use('/static',express.static('static'));// For serving static files

app.set('view engine','pug'); // Set the template engine as pug
app.use(express.urlencoded())


app.set('views', path.join(__dirname, 'views')); // Set the views directory

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    city: String
  });
const Contact = mongoose.model('contact', contactSchema);

app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
});
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
       myData.save().then(()=>{
       res.send("This item has been saved to the database")
       }).catch(()=>{
       res.status(400).send("item was not saved to the databse")
       })
});
app.listen(port,()=>{
    console.log(`app is running at ${port} `);
});