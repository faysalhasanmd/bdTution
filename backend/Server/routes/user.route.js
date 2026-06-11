const express = require("express");
const router = express.Router();
const {
  saveUser,
  getAllUsers,
  getUserRole,
  updateRoleByEmail,
  updateRoleById,
  deleteUser,
  getAllTutors,
  getLatestTutors,
  getTutorById,
} = require("../controllers/user.controller");

router.post("/", saveUser);
router.get("/", getAllUsers);
router.get("/role/:email", getUserRole);
router.patch("/role/:email", updateRoleByEmail);
router.put("/role/:id", updateRoleById);
router.delete("/:id", deleteUser);
router.get("/tutors", getAllTutors);
router.get("/latest-tutors", getLatestTutors);
router.get("/tutors/:id", getTutorById);

module.exports = router;
