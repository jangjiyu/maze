const express = require("express");
const User = require("./users");

const router = express.Router();

router.use("/users", User);

module.exports = router;
