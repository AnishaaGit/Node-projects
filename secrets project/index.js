import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const password = "Secret@1234";
var isAuthorised = false;


app.use(bodyParser.urlencoded({extended:true}));

function checkPassword(req, res, next){
    if (req.body["password"] === password){
        isAuthorised = true;
    }
    next();
}


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.use(checkPassword);


app.post("/check", (req, res) => {
    if(isAuthorised){
        res.sendFile(__dirname + "/public/secret.html");
    }else{
        res.redirect("/")
    }
 })

app.get("/", (req, res) => {
res.sendFile(__dirname + "/public/index.html");
})




app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})