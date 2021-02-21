const router = require("express").Router()
const verify = require("./verifyToken")


router.get('/', verify,((req, res) => {

    res.json({post: {title: "Hello Word", description: "ONly with token"}})
}))


module.exports = router;