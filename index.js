const express = require('express');
const path = require('path');
const port = 8000;

const db = require("./config/mongoose");

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("assets"));

app.use("/", require("./routes"));


app.listen(port, function(err){
    if(err) {
        console.log("error in connecting with server ", err);
        return;
    }
    console.log(`Server is working fine on port ${port}`);
})