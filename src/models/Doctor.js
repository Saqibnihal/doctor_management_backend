const BaseModel = require("../models/constants/BaseModel");

class Doctor extends BaseModel {
  static get tableName() {
    return "doctors";
  }

  static get relationMappings() {
    const User = require("../models/User");
    const Appointment = require("../models/Appointment");

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'doctors.user_id',
          to: 'users.id',
        },
      },
      appointments: {
        relation: BaseModel.HasManyRelation,
        modelClass: Appointment,
        join: {
          from: 'doctors.id',
          to: 'appointments.doctor_id',
        },
      },
    };
  }
}

module.exports = Doctor;
