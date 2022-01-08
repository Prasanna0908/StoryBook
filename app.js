const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./db/connect')
const app = express()
const dotenv = require("dotenv");
dotenv.config();

const path = require('path')
const exphbs = require("express-handlebars")
const morgan = require('morgan')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');

require('./config/passport')(passport)

const PORT = process.env.PORT || 3000
const url = process.env.MONGO_URI

// Body Parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Method override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
  )

// logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// HandleBars Helpers
const {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
  } = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', exphbs.engine({helpers: { formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
}, extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', '.hbs')

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
    })
  )

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Global variable
app.use(function(req, res, next) {
    res.locals.user = req.user || null ;
    next()
})

// static
app.use(express.static(path.join(__dirname , 'public' )))

//routes
app.use('/' , require('./routes/index'))
app.use('/auth' , require('./routes/auth'))
app.use('/stories' , require('./routes/stories'))

const start = async() => {
    try{
        await connectDB(url)
        app.listen(PORT, ()=> console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV}`))
    }catch(err){
        console.log(error)
    }
}

start()


