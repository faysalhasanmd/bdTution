require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { connectDB } = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const paymentRoute = require("./routes/payment.route");
const tuitionRoute = require("./routes/tuition.route");
const userRoute = require("./routes/user.route");
const contactRoute = require("./routes/contact.route");

const port = process.env.PORT || 3000;

const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString(
  "utf-8",
);
admin.initializeApp({ credential: admin.credential.cert(JSON.parse(decoded)) });

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://bdtuitions.vercel.app",
      "https://cerulean-maamoul-f79e46.netlify.app",
      "https://preeminent-mermaid-04ba7b.netlify.app/",
    ],
  }),
);
app.use(express.json());

app.use("/tuition", tuitionRoute);
app.use("/user", userRoute);
app.use("/users", userRoute);
app.use("/contact", contactRoute);
app.use("/", paymentRoute);

app.use(errorHandler);

app.get("/", (req, res) => res.send("eTuitionBD Server Running..."));

connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
