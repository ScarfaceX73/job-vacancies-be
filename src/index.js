const express = require("express");
const mongo = require("./connect");
const jobRouter = require("./router/index");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());

mongo.connect();

app.use("/", (req, res, next) => {
    console.log(req?.method);
    let allowedOrigin = ["http://localhost:3000"];
    if (allowedOrigin.indexOf(req.headers.origin) != -1) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Set-Cookie, authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
    }
    next();
});

app.use("/", jobRouter);

app.listen(process.env.PORT || 5000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
