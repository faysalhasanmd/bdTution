const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: { version: ServerApiVersion.v1, strict: true },
});

let db;

const connectDB = async () => {
  await client.connect();
  db = client.db("eTuitionBD");
  console.log("Connected to MongoDB Successfully!");
};

const getDB = () => db;

module.exports = { connectDB, getDB };
