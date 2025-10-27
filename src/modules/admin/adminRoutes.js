const express = require("express");
const {
  login,
  createDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  createPatient,
  getPatients,
  deletePatient,
  updatePatient,
  assignPatientToDoctor,
  dashboard,
} = require("./adminController");

const router = express.Router();

//logihn
router.post("/login", login);

//doctors
router.post("/doctors", createDoctor);
router.get("/doctors", getDoctors);
router.patch("/doctors/:id", updateDoctor);
router.delete("/doctors/:id", deleteDoctor);

//patients
router.post("/patients", createPatient);
router.get("/patients", getPatients);
router.patch("/patients/:id", updatePatient);
router.delete("/patients/:id", deletePatient);

//assigning patient to the doctor
router.patch("/patients/:id/assign-doctor",assignPatientToDoctor);

//dashboard
router.get("/dashboard", dashboard);

module.exports = router;
