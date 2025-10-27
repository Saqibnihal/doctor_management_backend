const { Model } = require("objection");

const {v4:uuidv4}=require('uuid');

class BaseModel extends Model {
    $beforeInsert(){
        if (!this.id) {
            this.id=uuidv4();  //this will automatically call the uuid if not already present there
        } 
    }
}

module.exports=BaseModel;