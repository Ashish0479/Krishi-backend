const express = require('express')
const connectDB = require('./config/dbConfig')
const serverConfig = require('./config/serverConfig')
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
const weatherRouter = require('./routes/weatherRouter')
const chatRouter = require('./routes/chatbotRouter')
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
  "https://Krishi-Sakhi-crl0.onrender.com",
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

app.use('/users',userRouter)
app.use('/auth',authRouter)
app.use('/weather',weatherRouter)
app.use('/chat',chatRouter)

app.get('/hii',(req,res)=>{
    return res.json({message:'hello'})

})
app.listen(PORT,async ()=>{
    await connectDB()
    console.log(`Server is running on port ${PORT}`)
})