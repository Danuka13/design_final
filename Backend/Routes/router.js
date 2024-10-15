const express = require('express');
const router = express.Router();
const products = require('../Models/Products');

// Insert Product (Create)
router.post("/api/insertproduct", async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        const pre = await products.findOne({ ProductBarcode: ProductBarcode })
        if (pre) {
            return res.status(422).json({ error: "Product is already added." });
        } else {
            const addProduct = new products({ ProductName, ProductPrice, ProductBarcode });
            await addProduct.save();
            res.status(201).json(addProduct);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get All Products (Read)
router.get('/api/products', async (req, res) => {
    try {
        const getProducts = await products.find({});
        res.status(200).json(getProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get Product by ID (Read)
router.get('/api/products/:id', async (req, res) => {
    try {
        const getProduct = await products.findById(req.params.id);
        res.status(200).json(getProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update Product (Edit)
router.put('/api/updateproduct/:id', async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        const updatedProduct = await products.findByIdAndUpdate(
            req.params.id,
            { ProductName, ProductPrice, ProductBarcode },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete Product
router.delete('/api/deleteproduct/:id', async (req, res) => {
    try {
        const deletedProduct = await products.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
