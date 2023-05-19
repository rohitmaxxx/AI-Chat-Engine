import express from 'express';

import { health, test } from '../controllers/controllerHealth';
import { uploadPdfDoc } from '../controllers/controllerUploadPDF';
import { chat } from '../controllers/chat';

import multer from 'multer';

const upload = multer({ dest: "./temp/" });

const uploadTFileArray = [{
    name: "file",
    maxCount: 2
  }];


const router = express.Router();

router.post('/test', test);
router.get('/health', health);

router.post('/v1/uploadpdf_doc', upload.fields(uploadTFileArray), uploadPdfDoc);
router.post('/v1/chat', chat);


export default [router];