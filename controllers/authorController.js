const Author = require("../moduls/author");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const getAllAuthor = async (req, res) => {
    try {
        const products = await Author.find().select('_id name img');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
}; 

const addAuthor = async (req, res) => {
    const {name} = req.body;
    if (!name || !req.file) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'authors',
            use_filename: true,
            unique_filename: false,
        });
        // Remove the file from local storage
        fs.unlinkSync(req.file.path);
        const img = result.secure_url;
        const newAuthor = new Author({ name, img });
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(500).json({ message: "Error adding author", error: error.message });
    }
};

module.exports = { getAllAuthor, addAuthor };
