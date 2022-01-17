const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('./avatarController');
const storage = multer.diskStorage({
    
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
});


router.post('/', upload.single('image'), controller.updateAvatar);

module.exports = router;