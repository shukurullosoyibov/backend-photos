import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from 'path';
import categoryModels from '../models/category.js'
// import File from '../models/File.js';
import FileModels from '../models/Files.js'

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const {  title, description, category, categorySlug,owner } = req.body;
    const { filename } = req.file;

    // Save file details to MongoDB
    const file = new FileModels({
      filename: filename,
      filepath: `/uploads/${filename}`,
      title: title || 'Untitled',
      description: description || '',
      category: category || 'Uncategorized',
      categorySlug: categorySlug || 'categorySlug',
      owner: owner || 'Anonymous',
    });
    await file.save();

    res.json({ message: 'File uploaded successfully', filename: filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});
router.get('/all', async (req, res) => {
    try {
        const data = await FileModels.find();
        res.status(200).json({ message: 'success', data });
    } catch (error) {
          res.status(404).json({ message: 'error', error });
    }   
})


router.get("/search" , async (req, res)=>{
     const data =  await FileModels.find(req.query);
     if(data.length > 0){
    
      res.status(200).json(data)
     }
     else{
      return res.status(404).json({ message: "Not found"})
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const data = await FileModels.findById(id);
      if (data) {
           res.status(200).json({ message: 'success', data });
      } else {
    
           res.status(404).json({ message: 'Not found' });
      }
  } catch (error) {
      console.error(error); // Log the error for debugging purposes
       res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});



/// delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the file record from the database
    const deletedFile = await FileModels.findByIdAndDelete(id);
  if(deletedFile){
    const filePath = path.join(__dirname, '../uploads', deletedFile.filename);
    fs.unlinkSync(filePath);

    res.json({ message: 'File deleted successfully' });
  }
    else{
      return res.status(404).json({ message: 'not found' });
    }
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting file' });
  }
});

router.get('/category/:slug', async (req, res) => {
  const {slug} =  req.params;
   
  try {
    const photosByCategory = await FileModels.find({ categorySlug: slug });
    res.json(photosByCategory);
  } catch (error) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});



/// update
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, description, category, owner } = req.body;

  try {
    // Find the existing file record
    const existingFile = await FileModels.findById(id);

    // Update file details in the database
    const updatedFile = await FileModels.findByIdAndUpdate(
      id,
      {
        title: title || existingFile.title,
        description: description || existingFile.description,
        category: category || existingFile.category,
        owner: owner || existingFile.owner,
      },
      { new: true }
    );

    // If a new image is provided, update the filename and filepath
    if (req.file) {
      const { filename } = req.file;
      updatedFile.filename = filename;
      updatedFile.filepath = `/uploads/${filename}`;
      await updatedFile.save();
    }

    res.json({ message: 'File updated successfully', data: updatedFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating file' });
  }
});


router.get('/getAllCategoriesWithFeaturedImages', async (req, res) => {
  try {
    const categories = await categoryModels.find();
    const images = await FileModels.find();

    const result = categories.map(category => {
      const categoryImages = images.filter(image => image.categorySlug === category.slug && category.featured === true);
      return { ...category.toObject(), images: categoryImages };
    });

    res.json({ message: "success", data: result });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
});

export default router;
