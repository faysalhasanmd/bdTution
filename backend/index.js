require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const admin = require("firebase-admin");

const port = process.env.PORT || 3000;
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString(
  "utf-8",
);
const serviceAccount = JSON.parse(decoded);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://bdtuitions.vercel.app",
      "https://cerulean-maamoul-f79e46.netlify.app",
    ],
  }),
);
app.use(express.json());

// JWT Verify (Optional for now)
const verifyJWT = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "Unauthorized!" });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.tokenEmail = decoded.email;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};
// *****************************

// **************************
// MongoDB Setup
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: { version: ServerApiVersion.v1, strict: true },
});

async function run() {
  try {
    const db = client.db("eTuitionBD");
    const tuitionCollection = db.collection("tuition");
    const applicationsCollection = db.collection("applications");
    const UsersCollection = db.collection("users");
    const paymentsCollection = db.collection("payments");

    // Student Posts Tuition
    app.post("/tuition", async (req, res) => {
      const tuitionData = req.body;
      tuitionData.status = "Pending";
      tuitionData.postedAt = new Date();

      const result = await tuitionCollection.insertOne(tuitionData);
      res.send(result);
    });

    app.get("/user/role/:email", async (req, res) => {
      const email = req.params.email;
      const result = await UsersCollection.findOne({ email });
      res.send({ role: result?.role });
    });

    // app.get("/user/role/:email", async (req, res) => {
    //       const email = req.params.email;
    //       const result = await UsersCollection.findOne({ email });
    //       console.log(result);
    //       res.send({ role: result?.role });
    //     });

    // ***************

    //user save and update
    app.post("/user", async (req, res) => {
      const userData = req.body;

      userData.role = userData.role || "Student";
      userData.created_at = new Date().toISOString();
      userData.last_loggedIn = new Date().toISOString();

      const query = { email: userData.email };
      const alreadyExist = await UsersCollection.findOne(query);

      if (alreadyExist) {
        const result = await UsersCollection.updateOne(query, {
          $set: {
            last_loggedIn: new Date().toISOString(),
            role: alreadyExist.role || userData.role,
          },
        });
        return res.send(result);
      }

      const result = await UsersCollection.insertOne(userData);
      res.send(result);
    });
    // ************************************
    app.get("/users", async (req, res) => {
      try {
        const users = await UsersCollection.find({}).toArray();
        res.send(users);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch users" });
      }
    });

    // Update user role
    app.put("/users/role/:id", async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;

      try {
        const result = await UsersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role } },
        );
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to update role" });
      }
    });

    // Delete user
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const result = await UsersCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to delete user" });
      }
    });

    app.patch("/users/role/:email", async (req, res) => {
      const email = req.params.email;
      const { role } = req.body;
      try {
        const result = await UsersCollection.updateOne(
          { email },
          { $set: { role } },
        );
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to update role" });
      }
    });
    // ************************************

    // user get role
    // app.get("/user/role/:email", async (req, res) => {
    //   if (req.tokenEmail !== req.params.email) {
    //     return res.status(403).send({ message: "Forbidden" });
    //   }
    //   const result = await UsersCollection.findOne({
    //     email: req.params.email,
    //   });
    //   res.send({ role: result?.role });
    // });

    app.get("/user/role/:email", async (req, res) => {
      const email = req.params.email;
      const result = await UsersCollection.findOne({ email });
      console.log(result);
      res.send({ role: result?.role });
    });

    // Get all tutors
    app.get("/users/tutors", async (req, res) => {
      try {
        const db = client.db("eTuitionBD");
        const UsersCollection = db.collection("users");

        const tutors = await UsersCollection.find({ role: "Tutor" }).toArray();
        res.send(tutors);
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to fetch tutors" });
      }
    });

    // Get single tutor by ID
    app.get("/users/tutors/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const tutor = await UsersCollection.findOne({
          _id: new ObjectId(id),
          role: "Tutor",
        });
        if (!tutor) {
          return res.status(404).send({ message: "Tutor not found" });
        }
        res.send(tutor);
      } catch (err) {
        res.status(500).send({ message: "Server error" });
      }
    });

    // Get tutor ongoing tuitions (approved by student)
    app.get("/tutor/ongoing/:email", async (req, res) => {
      const email = req.params.email;

      const query = {
        tutorEmail: email,
        status: "Accepted", // only approved ones
      };

      const result = await applicationsCollection.find(query).toArray();
      res.send(result);
    });

    // GET payments for a tutor
    // GET payments for a tutor (fixed)
    app.get("/payments/tutor/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const paymentsCollection = client
          .db("eTuitionBD")
          .collection("payments");
        const applicationsCollection = client
          .db("eTuitionBD")
          .collection("applications");

        const payments = await paymentsCollection
          .aggregate([
            {
              $addFields: {
                applicationObjId: { $toObjectId: "$applicationId" },
              },
            },
            {
              $lookup: {
                from: "applications",
                localField: "applicationObjId",
                foreignField: "_id",
                as: "applicationInfo",
              },
            },
            { $unwind: "$applicationInfo" },
            {
              $match: {
                "applicationInfo.tutorEmail": email,
                paymentStatus: "paid",
              },
            },
            { $sort: { paidAt: -1 } },
          ])
          .toArray();

        res.send(payments);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch payments" });
      }
    });

    app.patch("/users/role/:email", async (req, res) => {
      const email = req.params.email;
      const { role } = req.body;
      const result = await UsersCollection.updateOne(
        { email },
        { $set: { role } },
      );
      res.send(result);
    });

    // Get latest tutors
    app.get("/users/latest-tutors", async (req, res) => {
      try {
        const latestTutors = await UsersCollection.find({ role: "Tutor" })
          .sort({ created_at: -1 })
          .limit(6) // latest 6
          .toArray();

        res.send(latestTutors);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to fetch latest tutors" });
      }
    });

    //get tuition latest
    app.get("/tuition/latest", async (req, res) => {
      try {
        const result = await tuitionCollection
          .find({ status: "Approved" })
          .sort({ postedAt: -1 }) // Latest first
          .limit(6)
          .toArray();
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch latest tuition" });
      }
    });

    // Get tuition by ID
    app.get("/tuition/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const tuition = await tuitionCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!tuition) return res.status(404).send({ message: "Not found" });
        res.send(tuition);
      } catch (err) {
        res.status(500).send({ message: "Server error" });
      }
    });

    // DELETE Tuition
    app.delete("/tuition/:id", async (req, res) => {
      const id = req.params.id;
      const result = await tuitionCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // --------------------------------------------------------------

    // Tutor Apply
    app.post("/applications", async (req, res) => {
      const application = req.body;
      application.status = "Pending";
      application.appliedAt = new Date();
      const result = await applicationsCollection.insertOne(application);
      res.send(result);
    });

    // --------------------------------------------------------------
    app.get("/applications/student/:email", async (req, res) => {
      try {
        const email = req.params.email;

        // Step 1: find student posted tuitions
        const tuitions = await tuitionCollection
          .find({ studentEmail: email })
          .toArray();

        const tuitionIds = tuitions.map((t) => t._id.toString());

        // Step 2: find applications
        const applications = await applicationsCollection
          .find({ tuitionId: { $in: tuitionIds } })
          .toArray();

        res.send(applications);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch applications" });
      }
    });
    app.patch("/applications/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { status } = req.body;

        const result = await applicationsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status } },
        );

        res.send({ success: true, result });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to update status" });
      }
    });

    // Get Applications by Tuition ID (Student Dashboard)
    app.get("/applications/tuition/:id", async (req, res) => {
      const tuitionId = req.params.id;
      const result = await applicationsCollection.find({ tuitionId }).toArray();
      res.send(result);
    });

    app.patch("/applications/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { status } = req.body;

        const result = await applicationsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status: status } },
        );

        if (result.modifiedCount > 0) {
          res.send({ success: true });
        } else {
          res.send({ success: false });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ success: false });
      }
    });

    // --------------------------------------------------------------

    // Update Tuition
    app.put("/tuition/update/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const result = await tuitionCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData },
      );
      res.send(result);
    });

    // ⬅ Get Tuitions (Support ?status=Approved OR Pending)
    app.get("/tuition", async (req, res) => {
      try {
        const { status, email } = req.query;
        let query = {};

        if (status) query.status = status;

        if (email) query.studentEmail = email;

        const result = await tuitionCollection
          .find(query)
          .sort({ postedAt: -1 })
          .toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch tuitions" });
      }
    });

    // ⬅ Admin Approves Tuition
    app.put("/tuition/approve/:id", async (req, res) => {
      const id = req.params.id;
      const result = await tuitionCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "Approved" } },
      );
      res.send(result);
    });

    //payment system
    app.post("/create-checkout-session", async (req, res) => {
      try {
        const paymentInfo = req.body;
        console.log("Payment Info:", paymentInfo);

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "BDT",
                product_data: {
                  name: paymentInfo.tutorName,
                  description: paymentInfo.qualification,
                },
                unit_amount: paymentInfo.expectedSalary * 100,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          metadata: {
            applicationId: paymentInfo._id,
          },
          success_url: `http://localhost:5173/payment-complete?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `http://localhost:5173/dashboard/tutor-applied-tuition`,
        });

        res.json({ success: true, url: session.url });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message });
      }
    });

    //verify payment
    app.post("/verify-payment", async (req, res) => {
      try {
        const { sessionId } = req.body;

        if (!sessionId) {
          return res
            .status(400)
            .json({ success: false, message: "No sessionId" });
        }
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
          return res.json({ success: false, message: "Payment not completed" });
        }

        const applicationId = session.metadata.applicationId;
        const alreadyPaid = await paymentsCollection.findOne({ sessionId });

        if (alreadyPaid) {
          return res.json({ success: true, message: "Already processed" });
        }

        await applicationsCollection.updateOne(
          { _id: new ObjectId(applicationId) },
          { $set: { status: "Accepted" } },
        );

        const paymentData = {
          applicationId,
          sessionId,
          amount: session.amount_total / 100,
          currency: session.currency,
          paymentMethod: session.payment_method_types[0],
          paymentStatus: session.payment_status,
          paidAt: new Date(),
        };

        await paymentsCollection.insertOne(paymentData);
        res.json({ success: true });
      } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ success: false });
      }
    });

    // Get Applications by Tutor Email (Tutor Dashboard)
    app.get("/applications/tutor/:email", async (req, res) => {
      try {
        const email = req.params.email;

        const result = await applicationsCollection
          .find({ tutorEmail: email })
          .sort({ appliedAt: -1 })
          .toArray();

        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch tutor applications" });
      }
    });

    app.delete("/applications/:id", async (req, res) => {
      try {
        const id = req.params.id;

        // Only delete if status is Pending
        const result = await applicationsCollection.deleteOne({
          _id: new ObjectId(id),
          status: "Pending",
        });

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to delete" });
      }
    });

    app.patch("/applications/update/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updatedData = req.body;

        const result = await applicationsCollection.updateOne(
          {
            _id: new ObjectId(id),
            status: "Pending", // Important condition
          },
          {
            $set: {
              qualifications: updatedData.qualifications,
              experience: updatedData.experience,
              expectedSalary: updatedData.expectedSalary,
            },
          },
        );

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to update" });
      }
    });
    app.get("/admin/reports/transactions", async (req, res) => {
      try {
        const paymentsCollection = client
          .db("eTuitionBD")
          .collection("payments");

        // Fetch all successful payments
        const transactions = await paymentsCollection
          .find({ paymentStatus: "paid" })
          .sort({ paidAt: -1 })
          .toArray();

        // Calculate total earnings
        const totalEarnings = transactions.reduce(
          (sum, t) => sum + (t.amount || 0),
          0,
        );

        res.send({ totalEarnings, transactions });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch reports" });
      }
    });

    //get payment info
    app.get("/payments/student/:email", async (req, res) => {
      try {
        const email = req.params.email;

        // 1️⃣ Find student tuitions
        const tuitions = await tuitionCollection
          .find({ studentEmail: email })
          .toArray();

        const tuitionIds = tuitions.map((t) => t._id.toString());

        // 2️⃣ Find applications
        const applications = await applicationsCollection
          .find({ tuitionId: { $in: tuitionIds } })
          .toArray();

        const applicationIds = applications.map((app) => app._id.toString());

        // 3️⃣ Find payments
        const payments = await paymentsCollection
          .find({ applicationId: { $in: applicationIds } })
          .sort({ paidAt: -1 })
          .toArray();

        res.send(payments);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch payments" });
      }
    });

    //last
    app.get("/admin/dashboard-stats", async (req, res) => {
      try {
        const users = await UsersCollection.countDocuments();
        const tutors = await UsersCollection.countDocuments({ role: "Tutor" });
        const students = await UsersCollection.countDocuments({
          role: "Student",
        });

        const totalTuitions = await tuitionCollection.countDocuments();
        const approvedTuitions = await tuitionCollection.countDocuments({
          status: "Approved",
        });

        const totalApplications = await applicationsCollection.countDocuments();

        // Total Revenue
        const revenueResult = await paymentsCollection
          .aggregate([
            { $match: { paymentStatus: "paid" } },
            { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
          ])
          .toArray();

        const totalRevenue = revenueResult[0]?.totalRevenue || 0;

        // Monthly Revenue (for bar chart)
        const monthlyRevenue = await paymentsCollection
          .aggregate([
            { $match: { paymentStatus: "paid" } },
            {
              $group: {
                _id: { $month: "$paidAt" },
                revenue: { $sum: "$amount" },
              },
            },
            { $sort: { _id: 1 } },
          ])
          .toArray();

        res.send({
          users,
          tutors,
          students,
          totalTuitions,
          approvedTuitions,
          totalApplications,
          totalRevenue,
          monthlyRevenue,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to load dashboard stats" });
      }
    });
    //last

    console.log("Connected to MongoDB Successfully!");
  } catch (e) {
    console.log(e);
  }
}
run();

app.get("/", (req, res) => {
  res.send("eTuitionBD Server Running...");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
