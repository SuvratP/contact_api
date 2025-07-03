import { User } from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'





 export const register =  async (req,res)=>{

    const{name , email, password} = req.body
  
    if(name == "" || email == "" || password == "") res.json({message:"All fields are required"})
  
      let user = await User.findOne({email})
        if(user)
          return res.json({message:"User already exhist..!" ,success:false})
  
        const hashpassword = await bcrypt.hash(password,10)
      
  
    user = await User.create({
    name , email, password:hashpassword
  
   })
      res.json({message :"User created successfully..!", success:true, user})
  }


  export const login = async (req,res)=>{

    const{ email, password} = req.body
    if( email == "" || password == "") res.json({message:"All fields are required"})

      let user = await User.findOne({email})
      if(!user) res.json({message:"User not found",success:false})
        const validPass = await bcrypt.compare(password,user.password)
      if(!validPass) return res.json({message:"Wrong password bete",success:false})

        const token = jwt.sign({userId : user._id}, process.env.JWT,{
          expiresIn:'1d'
        })

        res.json({message:`Welcome mere bhai ${user.name}`,token,success:true})



  }