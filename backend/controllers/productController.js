import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"


// Function for updating a product
const updateProduct = async (req, res) => {
    try {
        const { productId, name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Check if the product exists
        const existingProduct = await productModel.findById(productId);
        if (!existingProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Handle images
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        // Upload new images or retain existing images
        const imagesUrl = [...existingProduct.image];
        if (image1) {
            const result = await cloudinary.uploader.upload(image1.path, { resource_type: 'image' });
            imagesUrl[0] = result.secure_url;
        }
        if (image2) {
            const result = await cloudinary.uploader.upload(image2.path, { resource_type: 'image' });
            imagesUrl[1] = result.secure_url;
        }
        if (image3) {
            const result = await cloudinary.uploader.upload(image3.path, { resource_type: 'image' });
            imagesUrl[2] = result.secure_url;
        }
        if (image4) {
            const result = await cloudinary.uploader.upload(image4.path, { resource_type: 'image' });
            imagesUrl[3] = result.secure_url;
        }

        // Update fields only if provided, otherwise retain old values
        const updatedData = {
            name: name || existingProduct.name,
            description: description || existingProduct.description,
            price: price ? Number(price) : existingProduct.price,
            category: category || existingProduct.category,
            subCategory: subCategory || existingProduct.subCategory,
            bestseller: bestseller !== undefined ? (bestseller === "true" ? true : false) : existingProduct.bestseller,
            sizes: sizes ? JSON.parse(sizes) : existingProduct.sizes,
            image: imagesUrl,
            date: Date.now() // Update modification date
        };

        // Save updated product
        await productModel.findByIdAndUpdate(productId, updatedData, { new: true });

        res.json({ success: true, message: "Product updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {

        const products = await productModel.find({});
        res.json({ success: true, products })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {

        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, updateProduct }