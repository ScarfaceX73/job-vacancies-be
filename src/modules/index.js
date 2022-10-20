const { ObjectId } = require("mongodb");
const mongo = require("../connect");

module.exports.createJob = async (req, res) => {
    try {
        const jobDetails = {
            isDeleted: false,
            ...(req?.body ?? {}),
        };
        console.log(jobDetails);
        await mongo.selectedDb.collection("jobs").insertOne(jobDetails);
        res.status(200).send({ message: "job added" });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.getJob = async (req, res, next) => {
    try {
        const jobData = await mongo.selectedDb
            .collection("jobs")
            .find({ isDeleted: false })
            .toArray();
        res.send(jobData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

module.exports.updateJob = async (req, res, next) => {
    try {
        const updatedData = await mongo.selectedDb
            .collection("jobs")
            .findOneAndUpdate(
                { _id: ObjectId(req.params.jobId) },
                { $set: { ...req.body.job } },
                { returnOriginal: true }
            );
        res.send(updatedData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

//It is not recommended to use delete function.
module.exports.deleteJob = async (req, res, next) => {
    try {
        const deletedData = await mongo.selectedDb
            .collection("jobs")
            .remove({ _id: ObjectId(req.params.jobId) });
        res.send(deletedData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};