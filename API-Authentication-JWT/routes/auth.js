const router = require("express").Router()
const User = require("../model/User")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const {registerValidation, loginValidation} = require("../validation")


router.post("/register", async (req, res) => {

    // VALIDATION before add the user to the DB
    let {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)


    // Check if user is already in the DB
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) {
        return res.status(400).send("Email already exist in DB")
    }

    // Hash the pass
    const saltRounds = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);

    // Add new user to DB
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser._id)
    } catch (e) {
        res.status(400).send(e)
    }

})


router.post("/login", async (req, res) => {

    // VALIDATION before check user from db
    let {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Check email if email is in db
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(400).send("Email or password incorrect")
    }

    // Compare req.password with the password from DB
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).send("Email or password incorrect");


    // Add JWT
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header("auth-token",token).send(token)
})


module.exports = router