const fs = require('fs');
const express = require('express');
const multer = require('multer');
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "jade");

var storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});

app.get("/", (req, res, next) => {
    fs.readFile("./index.html", (err, data) => {
        if(err) throw err;
        res.write(data);
        res.end();
    });
});

app.post("/file-upload", upload.single('file'), (req, res) => {
    let file = req.file
    res.send(`${file.filename} is successfully uploaded. file.size is ${file.size}.`);
});

app.listen(8080);
