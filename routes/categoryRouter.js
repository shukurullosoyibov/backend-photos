import categoryModels from '../models/category.js'

import express from 'express'
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from 'path';
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

//get all
router.get("/", async (req, res) =>{

    
    const data = await categoryModels.find();
    if(data.lenght == 0 ){

        res.status(400).json({message:false});
    }
    res.status(201).json({message:"success", data});
       
}
)

router.post('/create', upload.single('categoryImg'), async (req, res) => {
  try {
    const {   categoryName, slug, featured ,icons} = req.body;
    const { filename } = req.file;
   
  
    // Save file details to MongoDB
    const newCategory = new categoryModels({
        categoryName,
        slug,
        featured,
        icons,
        filename,
        filepath: `/uploads/${filename}`,
    });
  
    await newCategory.save();

    res.json({ message: 'File uploaded successfully', filename: filename  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});




router.put("/edit/:id", async (req, res) => {
    const { categoryName, slug} = req.body;
    const { id } = req.params;

    try {
        // Check if the ID is valid before proceeding
        if (!id) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        // Update the document by ID
        const updatedData = await categoryModels.findByIdAndUpdate(
            id,
            { categoryName,
                slug },
            { new: true } // Bu qismi qo'shib, yangilangan malumotlarni qaytarish uchun
        );

        // Check if the document exists
        if (!updatedData) {
            return res.status(404).json({ message: "Document not found" });
        }

        console.log(req.body, id);
        res.json({ message: "update", categoryName,  slug });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

/// query params
router.get('/search', async (req, res) => {
    const query = req.query;
  
    // Faqatgina categoryName, slug, yoki _id bo'yicha ma'lumotlarni olish
    const data = await categoryModels.find();
  
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "Not found" });
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
        const deletedData = await categoryModels.findByIdAndDelete(id);

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