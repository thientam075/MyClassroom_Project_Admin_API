const model = require("../users/userModel");
const db = require("../../database");
module.exports.updateAvatar = async (id, avatar) => {
    
     const result= await model.update(
      {
        avatar: avatar , 
      },
      { where: { id: id } }
    );
    
    return result;
  };