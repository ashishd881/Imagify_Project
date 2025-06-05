import express from 'express'
import { generateImage } from '../controllers/imageController.js'
import userAuth from '../Middleware/auth.js'


const imageRouter =  express.Router()

imageRouter.post('/generate-Image', userAuth ,generateImage)

export default imageRouter