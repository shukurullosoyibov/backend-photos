import express from "express";
import footerModels from '../models/footer.js'
const router = express.Router()

//get
router.get("/", async (req, res) =>{
    //    res.send("salom")
    const data = await footerModels.find();
    if(data.lenght == 0 ){

        res.status(400).json({message:false});
    }
    res.status(201).json({message:"success", data});
       
}
)
//post
router.post("/create", async (req, res) => {
    try {
        // Extract data from the request body
        const { brand,description, socialLink, copy } = req.body;

        // Create a new Header document
        const newFooter = new footerModels({
            brand,
            description,
            socialLink,
            copy
            
        });

        // Save the new document to the database
        const savedFooter = await newFooter.save();

        // Send a success response with the created document
        res.status(201).json({ message: "success", data: savedFooter });
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
        const updatedData = await footerModels.findByIdAndUpdate(
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
        const deletedData = await footerModels.findByIdAndDelete(id);

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