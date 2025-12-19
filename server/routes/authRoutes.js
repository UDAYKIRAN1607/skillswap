    // const express = require("express");
    // const router = express.Router();
    // const authController = require("../controllers/authController");

    // router.post("/signup", authController.signup);
    // router.post("/login", authController.login);

    // module.exports = router;
import express from "express";
import { signup, login } from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);   
export default router;
