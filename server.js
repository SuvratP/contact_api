import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'express'
import userRouter from './Routes/user.js'
import contactRouter from './Routes/contact.js'
import { config } from 'dotenv'


const app = express();
app.use(bodyParser.json()) 

// env setup 
config({path:'.env'})

// user router
app.use("/api/user/",userRouter )

// contact router
app.use("/api/contact/",contactRouter )


// Home route
app.get('/',(req,res)=>{
  res.json({message:"All good"})
})




mongoose.connect(process.env.MONGO_URI,{
    dbName : 'Node_js_Mastery_Course'
})
.then(()=> {console.log("Server is connected...!") 
})
.catch((err) => {
    console.error("❌ MongoDB connection error:");
    console.error(err); // This shows the full error object
  });

const port = process.env.PORT;

app.listen(port,()=> console.log(`server is running at ${port}`))