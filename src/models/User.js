const BaseModel = require('../models/constants/BaseModel');

class User extends BaseModel {
    static get tableName(){
        return "users";
    }
}

module.exports=User;
