const express = require("express");
// const mysql = require("../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/mysql");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "sampledb"
// });
// connection.connect(error => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Connection Established with MySQL.");
//   }
// });

app.get("/api", (req, res) => {
  res.send("Up and running!");
});
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "src")));
  // Handle React routing, return all requests to React app
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

app.listen(port, () => console.log(`listening on port ${port}`));
