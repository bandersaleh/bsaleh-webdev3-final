//lets bring in our libraries
require("dotenv").config();
const express = require("express");
//bring in the authentication routes
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000; // if port5001 doesnt exist then run port3000

//middleware
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to the JWT Demo");
});
app.use(authRoutes);

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
