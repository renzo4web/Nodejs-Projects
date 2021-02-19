const router = require("express").Router()
const User = require("../model/User")
const registerValidation = require("../validation")


router.post("/register", async (req, res) => {

    // VALIDATION
    let isErrorVal = registerValidation(req.body)
    if (isErrorVal) return res.status(400).send("Error")

    // Add new user to DB
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (e) {
        res.status(400).send(e)
    }

})


module.exports = router