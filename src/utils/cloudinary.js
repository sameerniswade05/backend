import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (localFilePath) {
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto", //filetype we set as auto
      });
      console.log("file is upload Successfully on cloudinary", response.url);
      return response;
    }
    return null;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the localy save temp file if operation got fail
    console.log("problem in uploding file on cloudinary ERROR::", error);
  }
};

export { uploadOnCloudinary };
