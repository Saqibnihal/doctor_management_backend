const express = require("express");
const app = express();
const { Model } = require("objection");
const knex = require("./src/db/knex");
const adminRoutes = require("./src/modules/admin/adminRoutes");
const doctorRoutes = require('./src/modules/doctor/doctorRoutes')
const patientRoutes = require('./src/modules/patient/patientRoutes')
const cors = require('cors');

Model.knex(knex);
app.use(cors({
  origin: ['http://localhost:5173', 'https://doctor-managemanet-sys-apk.netlify.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  credentials: true,
}));
app.use(express.json());





app.use("/admin", adminRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);



//this is for error handling outside the controllers
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server starts at http://localhost:${PORT}`);
});
