const express = require("express");
const { exec } = require("child_process");
const app = express();
const port = 5500;

app.set("view engine", "ejs"); // Set EJS as the template engine
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/executeCommand", (req, res) => {
    const folderPath = req.body.folderPath;

    // Run the 'node index.js organize' command with the provided folder path
    exec(`node index.js organize "${folderPath}"`, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(stderr);
        } else {
            
            res.send(stdout);

        }
    });
});

app.get("/", (req, res) => {
    res.render("index"); // Render the "index.ejs" template
});
app.get("/about", (req, res) => {
    res.render("about"); // Render the "index.ejs" template
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
