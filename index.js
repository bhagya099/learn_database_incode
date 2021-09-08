const express = require("express");
const app = express();
const PORT = process.env.PORT || 3008;

// BODY PARESER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// view
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("pages/index", {
        name: "Bhagyashree",
    });
});

app.get("/posts", (req, res) => {
    res.render("pages/post");
});

app.get("/posts/new", (req, res) => {
    res.render("pages/new-post");
});
app.listen(PORT, () => {
    console.log(`Your Port is : http://localhost:${PORT}`);
});