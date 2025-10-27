const Doctor = require('../../models/Doctor');
const Patient = require('../../models/Patient');
const Appointment = require('../../models/Appointment');

const User = require('../../models/User'); // ⬅️ import User model too

//doctor Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //find doctor user
    const doctorUser = await User.query().findOne({ username, password, role: 'doctor' });

    if (!doctorUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    //fetch doctor profile linked to this user
    const doctor = await Doctor.query().findOne({ user_id: doctorUser.id });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    return res.status(200).json({ message: 'Login successful', doctor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//get doctor their assigned patients
exports.getAssignedPatients = async (req, res) => {
  try {
    const doctorId = req.params.id; // doctor id

    const patients = await Patient.query()
      .where('assigned_doctor_id', doctorId);

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update patient notes and status
exports.updatePatientNotes = async (req, res) => {
  try {
    const { id } = req.params; // patient id
    const { status, notes } = req.body;

    const patient = await Patient.query().patchAndFetchById(id, { status, notes });

    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json({ message: 'Patient updated', patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get doctor appointment schedule
exports.getAppointments = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const appointments = await Appointment.query()
      .where('doctor_id', doctorId)
      .withGraphFetched('[patient]');

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
