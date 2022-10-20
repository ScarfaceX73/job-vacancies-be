const express = require("express");
const router = express.Router();
const jobModule = require("../modules/index");

router.get("/get", jobModule.getJob);

router.post("/add", jobModule.createJob);

router.put("/update/:jobId", jobModule.updateJob);

router.delete("/delete/:jobId", jobModule.deleteJob);

module.exports = router;