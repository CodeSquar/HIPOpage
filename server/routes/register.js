const {Router} = require("express")
const router = Router()
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken');
const UserSchema = require("../models/userModel.js")
const userInfo = require("../middlewares/userInfo.js")

router.post('/register',async (req,res) =>{
    try {
        const {username, password} = req.body
        const usernameExists = await UserSchema.findOne({ username})
        
        if (usernameExists) {
            return res.status(409).send("This username is in use");
        } else if (!username || !password) {
            // Manejar el caso en el que el correo electrónico o la contraseña no están presentes
            return res.status(400).send("username and password are required");
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const user = new UserSchema({
            username,
            password: hashedPassword
        })

        await user.save()

        const token = jwt.sign({id:user._id}, "lol"/*process.env.JWT_SECRET*/,{
            expiresIn:"1h"
        })

        res.status(201).json({
            message: "user registered",
            token,
            user,
            expiresIn:3600
        })
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post("/login",async (req,res)=>{
    const {username,password} = req.body
    try {
        const user = await UserSchema.findOne({username})
        if(!user){
            return res.status(401).json({message: "incorrect username or password"})
        }   
        const isMatch = bcryptjs.compareSync(password,user.password)
        if(!isMatch){
            return res.status(401).json({message: "incorrect username or password"})
        }
        const token = jwt.sign({id: user._id},"lol"/*process.env.JWT_SECRET*/,{
            expiresIn: '3600s',
        })
        res.status(201).json({
            message: 'User logged correctly',
            token,
            user,
            expiresIn: 3600,
        });
     } catch (err) {
        res.status(500).send(err)
    }
})

router.get("/userinfo", userInfo, async (req, res) => {
    try {
      const { id } = req.userInfo;
        
      // Buscar al usuario en la base de datos utilizando el _id
      const user = await UserSchema.findById(id);
        
      if (!user) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
      }
  
      // Devolver la información del usuario en la respuesta
      res.status(200).json({ success: true, user: user });
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      res.status(500).json({ success: false, message: 'Error al obtener información del usuario.' });
    }
  });
module.exports = router