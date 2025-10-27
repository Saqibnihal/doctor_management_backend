const express = require("express");
const app = express();
const { Model } = require("objection");
const knex = require("../src/db/knex");
const adminRoutes = require("./modules/admin/adminRoutes");
const doctorRoutes = require('./modules/doctor/doctorRoutes')
const patientRoutes = require('./modules/patient/patientRoutes')
const PORT = 4000;

Model.knex(knex);
app.use(express.json());


app.use("/admin", adminRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);



//this is for error handling outside the controllers
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});


app.listen(PORT, () => {
  console.log(`server starts at http://localhost:${PORT}`);
});
