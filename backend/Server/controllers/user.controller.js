const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const saveUser = async (req, res) => {
  const db = getDB();
  const userData = req.body;
  userData.role = userData.role || "Student";
  userData.created_at = new Date().toISOString();
  userData.last_loggedIn = new Date().toISOString();

  const query = { email: userData.email };
  const alreadyExist = await db.collection("users").findOne(query);

  if (alreadyExist) {
    const result = await db.collection("users").updateOne(query, {
      $set: {
        last_loggedIn: new Date().toISOString(),
        role: alreadyExist.role || userData.role,
      },
    });
    return res.send(result);
  }
  const result = await db.collection("users").insertOne(userData);
  res.status(201).send(result);
};

const getAllUsers = async (req, res) => {
  const db = getDB();
  const users = await db.collection("users").find({}).toArray();
  res.send(users);
};

const getUserRole = async (req, res) => {
  const db = getDB();
  const result = await db
    .collection("users")
    .findOne({ email: req.params.email });
  res.send({ role: result?.role });
};

const updateRoleByEmail = async (req, res) => {
  const db = getDB();
  const result = await db
    .collection("users")
    .updateOne({ email: req.params.email }, { $set: { role: req.body.role } });
  res.send(result);
};

const updateRoleById = async (req, res) => {
  const db = getDB();
  const result = await db
    .collection("users")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { role: req.body.role } },
    );
  res.send(result);
};

const deleteUser = async (req, res) => {
  const db = getDB();
  const result = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.send(result);
};

const getAllTutors = async (req, res) => {
  const db = getDB();
  const tutors = await db.collection("users").find({ role: "Tutor" }).toArray();
  res.send(tutors);
};

const getLatestTutors = async (req, res) => {
  const db = getDB();
  const tutors = await db
    .collection("users")
    .find({ role: "Tutor" })
    .sort({ created_at: -1 })
    .limit(6)
    .toArray();
  res.send(tutors);
};

const getTutorById = async (req, res) => {
  const db = getDB();
  const tutor = await db.collection("users").findOne({
    _id: new ObjectId(req.params.id),
    role: "Tutor",
  });
  if (!tutor) return res.status(404).send({ message: "Tutor not found" });
  res.send(tutor);
};

module.exports = {
  saveUser,
  getAllUsers,
  getUserRole,
  updateRoleByEmail,
  updateRoleById,
  deleteUser,
  getAllTutors,
  getLatestTutors,
  getTutorById,
};
