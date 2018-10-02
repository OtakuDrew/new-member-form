const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const serverValidate = require("./server-validate");
const port = process.env.PORT || 5000;
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "member-schema"
});

app.use(bodyparser.json({ type: "application/json" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/submit", (req, res, next) => {
  console.log(req.body);
  const validate = serverValidate.formValidate(req.body);
  console.log(validate);
  if (validate == null) {
    connection.connect(error => {
      if (error) {
        console.log(error);
      } else {
        console.log("Connection Established with MySQL.");

        const {
          first,
          last,
          sex,
          birthdate,
          email,
          phone,
          street,
          city,
          state,
          zip,
          find,
          rec,
          recWeb,
          instructions,
          condition
        } = req.body;
        const address = street + " " + city + " " + state + " " + zip;

        var sql = `INSERT INTO newusers (firstName,lastName,sex,birthdate,email,phone,address,find,rec,recWeb,instructions,medCondition) 
  VALUES ('${first}','${last}','${sex}','${birthdate}','${email}','${phone}','${address}','${find}','${rec}','${recWeb}','${instructions}','${condition}')`;
        // (${first},${last},${sex},${birthdate},'daman\@gmail.com',${phone},'17432 zelzah st CA 93124',${find},${rec},'http://static.com',${instructions},${condition})
        connection.query(sql, (err, result) => {
          if (err) throw err;
          console.log("1 record inserted");
        });
      }
    });
  } else {
    res.send(validate);
  }
});
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use((req, res) => {
    express.static(path.join(__dirname, "build"));
  });
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => console.log(`listening on port ${port}`));
