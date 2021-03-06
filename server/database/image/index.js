//Libraries
require('dotenv').config();
import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

//Database model
import {ImageModel} from "../../database/allModels";

//Utilities
import {s3Upload} from "../../Utilities/AWS/s3";

const Router = express.Router();

//Multer config
const storage = multer.memoryStorage();
const upload = multer({storage});

//AWS S3 bucket config


/*
Route            /
Des              Uploading given image to S3 bucket , and then saving the file to mongodb
Params           None
Access           Public
Method           GET
*/

Router.post("/", upload.single("file") ,async(req,res)=> {
  try {
 const file = req.file;

 //S3 bucket options
 const bucketOptions = {
   Bucket: "shapeaijulybatch123",
   Key: file.originalname,
   Body: file.buffer,
   ContentType: file.mimetype,
   ACL: "public-read"
 };

 const uploadImage = await s3Upload(bucketOptions);

  } catch (error) {
return res.status(500).json({error: error.message});
  }
});

export default Router;
