const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

// ─── Create Checkout Session ──────────────────────────────────────────────────
const createCheckoutSession = async (req, res) => {
  try {
    const paymentInfo = req.body;

    if (!paymentInfo.expectedSalary || !paymentInfo.tutorName) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    const amountInCents = Math.round(Number(paymentInfo.expectedSalary) * 100);

    if (isNaN(amountInCents) || amountInCents <= 0) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid salary amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd", // Stripe BDT support করে না
            product_data: {
              name: `Tutor: ${paymentInfo.tutorName}`,
              description: paymentInfo.qualification || "Tuition Payment",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        applicationId: paymentInfo._id?.toString() || "",
      },
      success_url: `${process.env.CLIENT_URL}/payment-complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard/tutor-applied-tuition`,
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

// ─── Verify Payment ───────────────────────────────────────────────────────────
const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res
        .status(400)
        .json({ success: false, message: "No sessionId provided" });
    }

    const db = getDB();
    const paymentsCollection = db.collection("payments");
    const applicationsCollection = db.collection("applications");

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.json({ success: false, message: "Payment not completed" });
    }

    const alreadyPaid = await paymentsCollection.findOne({ sessionId });
    if (alreadyPaid) {
      return res.json({ success: true, message: "Already processed" });
    }

    const applicationId = session.metadata.applicationId;

    await applicationsCollection.updateOne(
      { _id: new ObjectId(applicationId) },
      { $set: { status: "Accepted" } },
    );

    await paymentsCollection.insertOne({
      applicationId,
      sessionId,
      amount: session.amount_total / 100,
      currency: session.currency,
      paymentMethod: session.payment_method_types[0],
      paymentStatus: session.payment_status,
      paidAt: new Date(),
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Verify payment error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ─── Get Payments by Student Email ───────────────────────────────────────────
const getPaymentsByStudent = async (req, res) => {
  try {
    const db = getDB();
    const email = req.params.email;

    const tuitions = await db
      .collection("tuition")
      .find({ studentEmail: email })
      .toArray();

    const tuitionIds = tuitions.map((t) => t._id.toString());

    const applications = await db
      .collection("applications")
      .find({ tuitionId: { $in: tuitionIds } })
      .toArray();

    const applicationIds = applications.map((a) => a._id.toString());

    const payments = await db
      .collection("payments")
      .find({ applicationId: { $in: applicationIds } })
      .sort({ paidAt: -1 })
      .toArray();

    res.send(payments);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to fetch payments" });
  }
};

// ─── Get Payments by Tutor Email ──────────────────────────────────────────────
const getPaymentsByTutor = async (req, res) => {
  try {
    const db = getDB();
    const email = req.params.email;

    const payments = await db
      .collection("payments")
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
    res.status(500).send({ message: "Failed to fetch tutor payments" });
  }
};

module.exports = {
  createCheckoutSession,
  verifyPayment,
  getPaymentsByStudent,
  getPaymentsByTutor,
};
