const User = require('../../models/User');
const Doctor = require('../../models/Doctor');
const Patient = require('../../models/Patient');
const Appointment = require('../../models/Appointment');


//this is a login for admin
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await User.query().findOne({ username, password, role: 'admin' });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful', admin });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//creating the doctor
exports.createDoctor = async (req, res) => {
  try {
    const { username, password, name, specialization, email, phone, about } = req.body;

    //Create user for doctor
    const user = await User.query().insert({ username, password, role: 'doctor' });

    //Create doctor profile
    const doctor = await Doctor.query().insert({
      user_id: user.id,
      name,
      specialization,
      email,
      phone,
    });

    return res.status(200).json({ message: 'Doctor created successfully', doctor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//getting doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.query().withGraphFetched('user');
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//updating doctors
exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization, email, phone, about } = req.body;

    const doctor = await Doctor.query().patchAndFetchById(id, {
      name,
      specialization,
      email,
      phone,
      about,
    });

    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    return res.status(200).json({ message: 'Doctor updated', doctor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//deleting doctors
exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.query().deleteById(id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    return res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//creating patient
exports.createPatient = async (req, res) => {
  try {
    const { username, password, name, email, phone, age, address } = req.body;

    const user = await User.query().insert({ username, password, role: 'patient' });

    const patient = await Patient.query().insert({
      user_id: user.id,
      name,
      email,
      phone,
      
    });

    return res.status(200).json({ message: 'Patient created successfully', patient });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//getting patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.query().withGraphFetched('user');
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//updating patients
exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, age, address } = req.body;

    const patient = await Patient.query().patchAndFetchById(id, {
      name,
      email,
      phone,
      age,
      address,
    });

    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    return res.status(200).json({ message: 'Patient updated', patient });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//deleting patient
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.query().deleteById(id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    return res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//assigning patient to doctor
exports.assignPatientToDoctor = async (req, res) => {
  try {
    const { id } = req.params; //its patient id, not anyother's 
    const { doctor_id } = req.body;

    const patient = await Patient.query().patchAndFetchById(id, { assigned_doctor_id: doctor_id });

    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    return res.status(200).json({ message: 'Patient assigned to doctor', patient });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



//this is for dashboard of docs, patients and appoints
exports.dashboard = async (req, res) => {
  try {
    const totalDoctors = await Doctor.query().resultSize();
    const totalPatients = await Patient.query().resultSize();
    const totalAppointments = await Appointment.query().resultSize();

    return res.status(200).json({ totalDoctors, totalPatients, totalAppointments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
