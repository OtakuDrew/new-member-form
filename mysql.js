const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const port = process.env.PORT || 5000;
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sampledb"
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
app.get("/api", (req, res) => {
  res.send("please work");
});
app.post("/submit", (req, res, next) => {
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
      const address = street + ", " + city + ", " + state + " " + zip;
      var sql = `INSERT INTO form (firstName,lastName,sex,birthdate,email,phone,address,find,rec,recWeb,instructions,medCondition) VALUES ('drew','alcazar','male','1998-07-06','drewalcazar23@gmail.com','8','16276 zelzah st granada hills CA 91344','http://google.com','dasda','http://cannamed.com','dsadas','insomnia')`;
      // ${first},${last},${sex},${birthdate},${email},${phone},${address},${find},${rec},${recWeb},${instructions},${condition}
      connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
      });
    }
  });
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
