const fs = require('fs');
const express = require('express');
const app = express();

// Importing productNames from names.json file
const productNames = JSON.parse(
    fs.readFileSync(`${__dirname}/data/names.json`)
);

// Middlewares
app.use(express.json());

// GET endpoint for fetching the product by id
app.get('/api/v1/names/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convert id to integer
    const product = productNames.find(p => p.id === id);
    
    if (product) {
        return res.status(200).json({
            status: "success",
            message: "Product name fetched successfully",
            data: {
                name: product
            }
        });
    } else {
        return res.status(404).json({
            status: "failed",
            message: "Not found!"
        });
    }
});

module.exports = app;
