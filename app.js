const express = require('express');
const path      = require('path')
const mongoose   = require('mongoose');
const bodyParser   = require('body-parser');
const session       = require('express-session');
const userRouter     = require('./router/userRouter');
const adminRouter     = require('./router/adminRouter');



const port = process.env.port||8080;

const app = express();

app.use(
    session({
        secret:'secret',
        resave:false,
        saveUninitialized:true
    })
);

app.use((req,res,next)=>{
    res.set('cache-control','no-store')
    next();
});

app.use(require('morgan')())

// DB connection
mongoose.connect('mongodb://localhost:27017/signupdb',{useNewUrlParser:true,useUnifiedTopology:false}).then(()=>{
    console.log('connected to database')
}).catch((err)=>{
    console.log('error in mongodb connection')
})
// const db = mongoose.connection;
// db.on("error",()=>{console.log("error in connection");})
// db.once('open',()=>{console.log("connected");})


app.set('view engine','ejs');

app.use(express.static('public'))

app.use(express.urlencoded({extended:true}));

// Parse application/json
app.use(express.json());



app.use('/',userRouter)
app.use('/adminlogin',adminRouter)



app.listen(8080,()=>{
    console.log('server running on http://localhost:8080');
})

