const BaseModel=require('../models/constants/BaseModel');

class Appointment extends BaseModel {
  static get tableName() {
    return "appointments";
  }

  static get relationMappings() {
    const Doctor = require("./Doctor");
    const Patient = require("./Patient");

    return {
      doctor: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Doctor,
        join: {
          from: 'appointments.doctor_id',
          to: 'doctors.id',
        },
      },
      patient: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: 'appointments.patient_id',
          to: 'patients.id',
        },
      },
    };
  }
}

module.exports = Appointment; 