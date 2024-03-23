const express = require("express");
const router = express.Router();
const {
	loginUser,
	verifyToken,
	getUserInfo,
} = require("../controllers/authController");

router.post("/login", loginUser);
router.get("/protected", verifyToken, (req, res) => {
	res.send("This is a protected route");
});
router.get("/userinfo", verifyToken, getUserInfo);

module.exports = router;
