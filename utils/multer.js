const multer = require('multer')


const multerConfig = multer.diskStorage({
    destination:  (_, _, callback) =>{
        callback(null, './uploads');
    }, 
    filename: (_, file, callback) =>{
        console.log(file); 
        callback(null, file.originalname)
    }
})

const upload = multer({ storage : multerConfig })
module.exports = upload 