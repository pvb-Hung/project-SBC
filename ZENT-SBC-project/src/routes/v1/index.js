//điều hướng
const express = require("express");
const router = express.Router();
const route = require("../v1/useRoutes.js");

router.use("/home",route);


module.exports = router;