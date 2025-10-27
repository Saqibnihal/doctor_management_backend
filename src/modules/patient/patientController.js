const User = require("../../models/User");
const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");
const Appointment = require("../../models/Appointment");

//patient registration
exports.register = async (req, res) => {
  try {
    const { username, password, name, email, phone, age, address } = req.body;

    //creating user
    const user = await User.query().insert({
      username,
      password,
      role: "patient",
    });

    //reating patient profile
    const patient = await Patient.query().insert({
      user_id: user.id,
      name,
      email,
      phone,
    });

    res
      .status(200)
      .json({ message: "Patient registered successfully", patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//patient login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const patientUser = await User.query().findOne({
      username,
      password,
      role: "patient",
    });

    if (!patientUser)
      return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user: patientUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//viewing the available doctors
exports.getDoctors = async (req, res) => {
  try {
    const { patient_id } = req.query;
    let query = Doctor.query().select(
      "id",
      "name",
      "specialization",
      "email",
      "phone"
    );

    if (patient_id) {
      // Get the patient's assigned doctor
      const patient = await Patient.query().findById(patient_id);

      if (patient && patient.assigned_doctor_id) {
        // Exclude the assigned doctor from the list
        query = query.whereNot("id", patient.assigned_doctor_id);
      }
    }

    const doctors = await query;

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//booking the appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_date, notes } = req.body;

    const appointment = await Appointment.query().insert({
      patient_id,
      doctor_id,
      appointment_date,
      notes
    });

    res.status(200).json({ message: "Appointment booked", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//view appointment history
exports.getAppointments = async (req, res) => {
  try {
    const { patient_id } = req.params;

    const appointments = await Appointment.query()
      .where("patient_id", patient_id)
      .withGraphFetched("[doctor]");

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
