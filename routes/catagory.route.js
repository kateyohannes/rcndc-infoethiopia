
const express = require("express")
const router = express.Router()
const {
    getCatagory,
    getCatagories,
    addCatagory,
    updateCatagory,

    deleteAll
} = require("../controllers/catagory.cotroller")

router.get("/", getCatagories);
router.get("/:id", getCatagory);
router.post("/add", addCatagory);
router.put("/update/:id", updateCatagory);

router.delete("/deleteAll", deleteAll)

module.exports = router;