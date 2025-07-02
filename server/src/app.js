require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');

app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your client URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

const cookieParser = require("cookie-parser")
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.SESSION_SECRET
}))

const authRoutes = require("./routes/authRoutes")
const doubtRoutes = require("./routes/doubtRoutes")
const commentRoutes = require("./routes/commentRoutes")


app.use('/api/auth', authRoutes)
app.use('/api/doubt', doubtRoutes)
app.use('/api/doubt/comment' , commentRoutes)


module.exports = app;
