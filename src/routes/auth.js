const express = require("express");
const { validateBody, checkAuth } = require("../middlewares");
const { signupSchema, loginSchema } = require("../validate_schemas");
const { signup, login, current, logout } = require("../controllers");
const { errorCatcher } = require("../utils");

const router = express.Router();

router.post("/signup", validateBody(signupSchema), errorCatcher(signup));

router.post("/login", validateBody(loginSchema), errorCatcher(login));

router.get("/current", checkAuth, errorCatcher(current));

router.get("/logout", checkAuth, errorCatcher(logout));

module.exports = router;
