var express = require('express')
var router = express.Router()
const controllerUser = require('../controller/userController')


router.get('/alluser', controllerUser.allUsers)
router.post("/newuser", controllerUser.newUser)
router.post("/getoneuser", controllerUser.getOneUser)
router.put("/updateoneuser", controllerUser.updateOneUser)
router.delete("/deleteoneuser/:id", controllerUser.deleteOneUser)


module.exports = router
