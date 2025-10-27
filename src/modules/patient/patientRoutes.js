const express = require('express');
const { register, login, getDoctors, getAppointments, bookAppointment } = require('./patientController');
const router = express.Router();

//registration and for login
router.post('/register',register);
router.post('/login',login);

//doctors
router.get('/doctors',getDoctors);

//appointments
router.post('/appointments', bookAppointment);
router.get('/appointments/:patient_id',getAppointments);

module.exports = router;
