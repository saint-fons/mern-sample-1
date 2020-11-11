const {Router} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post('/register', async (req, res) =>{
    try {
        const {email, password} = req.body

        const candidate = await User.findOne({ email })

        if(candidate) {
            res.status(400).json({ message:'Такой пользователь уже сущесвует'})
        }


        const hashedPassword = bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'Пользователь создан'})



    } catch (e) {
        res.status(500).json({message: 'Что то пошло не так попробуйте снова'})
    }
})


// /api/auth/register
router.post('/register', async (req, res) =>{

})


module.exports = router