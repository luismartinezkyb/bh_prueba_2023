
import multer from "multer";
import dotenv from "dotenv";
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config()

const allowedExt = ['png', 'jpg', 'jpeg', 'gif']

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}../storage`); // Uploads will be stored in the 'storage' folder
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename);
    }
})

const uploadMiddleware = multer({ //multer settings
    // storage,
    fileFilter: function (req, file, callback) {
        const ext = file.originalname.split('.').pop();
        if(!allowedExt.includes(ext)){
            return callback(new Error('Only images can be uploaded'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
});


export {uploadMiddleware}