const service = require('./avatarService');
const multer = require('multer');
const { uploadSingleImage } = require('../../config/cloudinary');
module.exports.updateAvatar = async (req, res, next) => {
    try {
        const uploadRes = await uploadSingleImage(req.file.path, "web-avatar");
        await service.updateAvatar(req.user.id, uploadRes.url);
        res.json(uploadRes.url); 
    } catch (error) {
        console.log(error)
    }
  
}