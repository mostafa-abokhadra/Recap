const express = require('express')
const app = express()
const cors = require('cors')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../practiceServer/avatars')
    },
    filename: function(req, file, cb) {
        const user = {
            name: "mostafa abokhadra"
        }
        const mimeType = file.mimetype.split('/')[1]
        const fileName = `${user.name}-avatar.${mimeType}`
        console.log("from middleware", fileName)
        cb(null, fileName)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
    },
    fileFilter: function(req, file, cb) {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/bmp",
            "image/webp",
            "image/tiff",
            "image/svg+xml",
            "image/x-icon",
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); 
        } else {
            cb(null, false);
        }
    }
})

app.use(cors())

app.get('/', (req, res) => {
    return res.send(`<h1>welcom to my app</h1>`)
})

app.post(
    '/avatar',
    upload.single('avatar'),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "Invalid file type. Please upload an image." });
        }
        res.status(200).json({ info: "File uploaded successfully!", file: req.file })
    }
)

app.listen(3000, ()=>{
    console.log(`i'm listening`)
})