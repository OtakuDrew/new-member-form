const express = require("express");
// const mysql = require("../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/mysql");
const app = express();
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
app.listen(port, () => console.log(`listening on port ${port}`));
app.get("/api", (req, res) => {
  res.send("Up and running!");
});
