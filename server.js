const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
// const MongoStore = require('connect-mongo')(session)
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const methodOverride = require('method-override')
// const method = require('./middleware/method')
const mainRoutes= require('./routes/main')
const taskRoutes = require('./routes/tasks')

require('dotenv').config({path: './config/.env'})

// passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))


// Sessions
app.use(
    session({
        secret: 'keyboard Cat',
        resave: false,
        saveUninitialized: false,
        // store: new MongoStore({ mongooseConnection: mongoose.connection}),
        // store: new MongoStore({ mongooseConnection: mongoose.connection }),
        store: MongoStore.create({mongoUrl: process.env.DB_STRING,}),
        cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }  // Cookie config
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// method override middleware
// app.use(methodOverride(method.override))
app.use(methodOverride("_method"));


app.use('/', mainRoutes)
app.use('/tasks', taskRoutes )


app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    