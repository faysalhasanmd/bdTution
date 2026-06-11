const express = require("express");
const router = express.Router();
const {
  createTuition,
  getAllTuitions,
  getLatestTuitions,
  getTuitionById,
  updateTuition,
  approveTuition,
  deleteTuition,
} = require("../controllers/tuition.controller");

router.post("/", createTuition);
router.get("/", getAllTuitions);
router.get("/latest", getLatestTuitions);
router.get("/:id", getTuitionById);
router.put("/update/:id", updateTuition);
router.put("/approve/:id", approveTuition);
router.delete("/:id", deleteTuition);

module.exports = router;
