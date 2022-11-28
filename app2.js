const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
    var firstName =req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    console.log(firstName, lastName, email);

    var data = {
        members: [
            {
                emai_address: email,
                status: "Subscibed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
            }
        }

    ]}
    const jsonData =JSON.stringify(data);

    const url ="https://us17.api.mailchimp.com/3.0/lists/600283f86a";

    const options = {
        method: "POST",
        auth: "nik:66873b11368980420f5a45306761bf07-us17"
    }

    const request = https.request(url, options, function(response) {
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();
});


app.listen(3000, function () {
    console.log("Server is running on the port 3000");
})


//api
//66873b11368980420f5a45306761bf07-us17

//id
//600283f86a.