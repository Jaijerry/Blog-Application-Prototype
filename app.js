import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const array = [];

app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.get("/blogs/:index/edit", (req, res) => {
    const blog = array[req.params.index - 1];
    res.render("edit.ejs", { blog, index: req.params.index });
});

app.post("/blogs/:index/update", (req, res) => {
    const index = req.params.index - 1;
    array[index] = req.body;
    res.redirect("/blogs");
});


app.get("/create", (req, res) => {
    res.render("create.ejs");
})

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", { array });
})

app.get("/blogs/:index", (req, res) => {
    const title = array[req.params.index-1].title;
    const content = array[req.params.index-1].content;
    res.render("content.ejs", { title, content })
})

app.post("/create", (req, res) => {
    res.render("create.ejs");
    array.push(req.body);
    console.log(array);
})

app.post("/blogs/:index/delete", (req, res) => {
    const index = req.params.index - 1;
    array.splice(index, 1);
    res.redirect("/blogs");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})