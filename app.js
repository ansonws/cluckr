const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const rootRouter = require("./routes/root");
const clucksRouter = require("./routes/clucks");
const app = express();

app.set('view engine', 'ejs');

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", rootRouter);
app.use("/clucks", clucksRouter);

const PORT = 4545;
const ADDRESS = "localhost"; 
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listenning on http://${ADDRESS}:${PORT}`);
});
