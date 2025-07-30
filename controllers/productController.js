const Product = require("../moduls/product");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().select('_id name img');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

const oneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};


const addProduct = async (req, res) => {
    const { name, title, desc, year } = req.body;
    if (!name || !title || !desc || !req.file) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'products',
            use_filename: true,
            unique_filename: false,
        });
        // Remove the file from local storage
        fs.unlinkSync(req.file.path);
        const img = result.secure_url;
        const newProduct = new Product({ name, title, desc, img, year });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};


const searchProduct = async (req, res) => {
    try {
        const label = req.params.label;
            
            if (!label)  return res.status(400).json({ });

        const products = await Product.find({
            name: { $regex: label, $options: 'i' } 
        }).select('name _id'); 

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};
 




module.exports = { getAllProducts, oneProduct, addProduct ,searchProduct};
