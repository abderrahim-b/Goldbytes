const express = require("express");
const router = express.Router();
const { signup, login } = require("../Controllers/Authcontroller");
const { createAdmin } = require("../Controllers/createadmin");

router.post("/signup", signup);
router.post("/login", login);
 router.post("/create-admin", createAdmin);

module.exports = router;
