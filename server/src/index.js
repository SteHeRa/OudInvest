const express = require("express");
const router = require("./router");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use("/", router);

const pathToClient = path.normalize(path.join(__dirname, "../../client/build"));
app.use(express.static(pathToClient));
app.use("/", express.static(pathToClient));

app.listen(PORT, () => {
  console.log(`Server Listening 👂 at http://localhost:${PORT}`);
});
