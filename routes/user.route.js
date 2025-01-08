
const express = require("express")
const {
    me,
    getUser,
    getUsers,
    registerUser,
    deleteUser

} = require("../controllers/user.controller");

const {
    authUser
} = require("../controllers/auth/user.controller")

const { loginValidator } = require("../validator/auth.validator")
const { 
    checkRoles,
    verifyAuthentication
} = require("../middleware/auth.middleware")

const router = express.Router();

router.get("/", verifyAuthentication, checkRoles(["admin"]), getUsers);
router.get("/me", verifyAuthentication, me)
router.get("/:id", getUser);


router.post("/login", loginValidator, authUser)
router.post("/register", registerUser);

router.delete("/delete/:id", deleteUser)

module.exports = router;