import express from "express";
import menuHeader from '../models/menuHeader.js'
import multer from 'multer';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage });

//get
router.get("/", async (req, res) =>{
    //    res.send("salom")
    const data = await menuHeader.find();
    if(data.lenght == 0 ){

        res.status(400).json({message:false});
    }
    res.status(201).json({message:"success", data});
       
}
)
//post
router.post("/create", upload.single('headerMenuImg'), async (req, res) => {
    try {
        // Extract data from the request body
        const { title, contact, call } = req.body;
        const { filename } = req.file;
        const parsedContact = JSON.parse(contact);
        const parsedCall = JSON.parse(call);
        // Create a new Header document
        const newHeader = new menuHeader({
            title,
            contact: [parsedContact],
            call: [parsedCall],
            filename,
            filepath: `/uploads/${filename}`,
        });

        // Save the new document to the database
        const savedHeader = await newHeader.save();

        // Send a success response with the created document
        res.status(201).json({ message: "success", data: savedHeader });
    } catch (error) {
        console.error(error);
        // Send an error response if something goes wrong
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//edit


router.put("/edit/:id", async (req, res) => {
    const { title,
        contact,
        helps,
        call,
        brand} = req.body;
    const { id } = req.params;

    try {
        // Check if the ID is valid before proceeding
        if (!id) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        // Update the document by ID
        const updatedData = await menuHeader.findByIdAndUpdate(
            id,
            { title,
                contact,
                helps,
                call,
                brand },
            { new: true } // Bu qismi qo'shib, yangilangan malumotlarni qaytarish uchun
        );

        // Check if the document exists
        if (!updatedData) {
            return res.status(404).json({ message: "Document not found" });
        }

        console.log(req.body, id);
        res.json({ message: "update", title,
        contact,
        helps,
        call,
        brand });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



//delete
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the ID is valid before proceeding
        if (!id) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        // Find and remove the document by ID
        const deletedData = await menuHeader.findByIdAndDelete(id);

        // Check if the document exists
        if (!deletedData) {
            return res.status(404).json({ message: "Document not found" });
        }

        console.log(`Deleted data with ID ${id}`);
        res.json({ message: "success deleted", deletedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export default router