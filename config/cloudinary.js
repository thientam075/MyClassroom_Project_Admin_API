const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   CLOUDINARY_URL: "cloudinary://481629412583211.-ztbz7uxGlDviRwg3czc8iivdKE@ddjuioczp",
// });
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadSingleImage = (file, foldername) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file, {
        folder: foldername,
      })
      .then((result) => {
        if (result) {
          resolve({
            url: result.secure_url,
            id: result.public_id,
          });
          return;
        }

        reject(null);
      });
  });
};

module.exports = {
  uploadSingleImage,
};
