const express = require('express')
const connectDB = require('./config/dbConfig')
const serverConfig = require('./config/serverConfig')
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
const weatherRouter = require('./routes/weatherRouter')
const chatRouter = require('./routes/chatbotRouter')
const cropRouter = require('./routes/cropHealthRouter')
const profileRouter = require('./routes/profileRouter')
const router=require('./routes/communityRouter')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = serverConfig.PORT || 5000  
const app = express()


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.text())



const allowedOrigins = [
  "https://Krishi-Sakhi.vercel.app",
  "https://krishi-sakhi-bb2b.onrender.com",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const path = require('path');

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/users',userRouter)
app.use('/auth',authRouter)
app.use('/weather',weatherRouter)
app.use('/chat',chatRouter);
app.use('/crop',cropRouter);
app.use('/profile',profileRouter);
app.use('/community',router);

app.get('/hii',(req,res)=>{
    return res.json({message:'hello'})

})
app.listen(PORT,async ()=>{
    await connectDB()
    console.log(`Server is running on port ${PORT}`)
})