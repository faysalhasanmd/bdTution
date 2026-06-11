const { getDB } = require("../config/db");

const saveContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).send({ message: "All fields are required" });
  }
  const db = getDB();
  const result = await db.collection("contacts").insertOne({
    name,
    email,
    subject,
    message,
    submittedAt: new Date(),
    status: "unread",
  });
  res.status(201).send({ success: true, result });
};

module.exports = { saveContact };
