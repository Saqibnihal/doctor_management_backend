const BaseModel = require("../models/constants/BaseModel");

class Patient extends BaseModel {
  static get tableName() {
    return "patients";
  }

  static get relationMappings() {
    const User = require("./User");
    const Appointment = require("./Appointment");

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'patients.user_id',
          to: 'users.id',
        },
      },
      appointments: {
        relation: BaseModel.HasManyRelation,
        modelClass: Appointment,
        join: {
          from: 'patients.id',
          to: 'appointments.patient_id',
        },
      },
    };
  }
}

module.exports = Patient;
