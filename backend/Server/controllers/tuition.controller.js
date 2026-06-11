const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const createTuition = async (req, res) => {
  const db = getDB();
  const tuitionData = req.body;
  tuitionData.status = "Pending";
  tuitionData.postedAt = new Date();
  const result = await db.collection("tuition").insertOne(tuitionData);
  res.status(201).send(result);
};

const getAllTuitions = async (req, res) => {
  const db = getDB();
  const { status, email } = req.query;
  let query = {};
  if (status) query.status = status;
  if (email) query.studentEmail = email;
  const result = await db
    .collection("tuition")
    .find(query)
    .sort({ postedAt: -1 })
    .toArray();
  res.send(result);
};

const getLatestTuitions = async (req, res) => {
  const db = getDB();
  const result = await db
    .collection("tuition")
    .find({ status: "Approved" })
    .sort({ postedAt: -1 })
    .limit(8)
    .toArray();
  res.send(result);
};

const getTuitionById = async (req, res) => {
  const db = getDB();
  const tuition = await db
    .collection("tuition")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!tuition) return res.status(404).send({ message: "Not found" });
  res.send(tuition);
};

const updateTuition = async (req, res) => {
  const db = getDB();
  const result = await db
    .collection("tuition")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
  res.send(result);
};

const approveTuition = async (req, res) => {
  const db = getDB();
  const result = await db
    .collection("tuition")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status: "Approved" } },
    );
  res.send(result);
};

const deleteTuition = async (req, res) => {
  const db = getDB();
  const result = await db
    .collection("tuition")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.send(result);
};

module.exports = {
  createTuition,
  getAllTuitions,
  getLatestTuitions,
  getTuitionById,
  updateTuition,
  approveTuition,
  deleteTuition,
};
