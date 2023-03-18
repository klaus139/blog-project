import express , {Request, Response, NextFunction} from 'express';
import multer from "multer"

const router= express.Router()

const storage = multer.diskStorage({
    destination:(req:any, file:any, cb:any) => {
        cb(null, "images")
    },
    filename: (req:any, file:any, cb:any) => {
        cb(null, req.body.name)
    }
})    

const upload = multer({storage})

router.post('/', upload.single("file"), (req:any, res:any) => {
    res.status(200).json("File has been uploaded")
})


export default router;