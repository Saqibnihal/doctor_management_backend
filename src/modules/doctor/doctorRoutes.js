const express = require('express');
const { getAssignedPatients, updatePatientNotes, getAppointments, login } = require('./doctorController');
const router = express.Router();

//doctor login
router.post('/login', login);

//get assigned patients for doctors
router.get('/:id/patients', getAssignedPatients);

//update patient notes and status
router.patch('/patients/:id', updatePatientNotes);

//get appointments
router.get('/:id/appointments', getAppointments);

module.exports = router;
