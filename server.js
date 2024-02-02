import express from 'express';
import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import multer from 'multer';

import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
// import fileUpload from 'express-fileupload';
import notFoundMiddleware from './middleware/not-found.js'
// import imgRouter from './routes/imageRouter.js'
import OurInstagram from './routes/ourInstagram.js'
import MenuHeader from './routes/menuHeader.js'
import FooterRouter from './routes/footerRouter.js'
import CategoryRouter from './routes/categoryRouter.js'
import uploadRouter from "./routes/upload.js"
import HeaderRouter from "./routes/header.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import UserRouter from './routes/users.js'
import AuthRouter from './routes/auth.js'
const app = express();
let port  = 4000;
import path from 'path'





app.use(express());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(fileUpload());
// app.use(cookieParser())
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.resolve(__dirname, '/images')))
// app.use("/uploads", express.static(__dirname+ "/uploads"))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.resolve(__dirname, './images')))
app.use(cors());
 app.use("/instagram", OurInstagram ) 
  app.use("/menu-header", MenuHeader ) 
  app.use("/footer", FooterRouter ) 
  app.use("/category", CategoryRouter ) 
  app.use('/api', uploadRouter);
  app.use('/header', HeaderRouter);


  app.use("/user", UserRouter);
  app.use("/auth", AuthRouter);
 
const MongoURL = "mongodb+srv://shukurullosoyibov10:mfEuOe6t4tL3PTwY@cluster0.b7tcizi.mongodb.net/photos?retryWrites=true&w=majority";

app.use(notFoundMiddleware)
mongoose
.connect(MongoURL)
.then( () =>{
    console.log("Mongodbga ulandi");
    app.listen(port, ()=>{
        console.log(port + " server ishga tushdi port" + port);
    })
})
.catch((err) =>{
    console.log(err);
})


// let password = "mfEuOe6t4tL3PTwY";