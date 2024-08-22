const express = require('express');
const Image = require('../models/Image');
const upload = require('../config/multerConfig');

const router = express.Router();

// POST route for image upload
router.post('/upload', upload.single('image'), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newImage = new Image({
            filename: req.file.filename,
            path: req.file.path,
            uploadedAt: Date.now(),
        });

        await newImage.save();

        res.json({ message: 'Image uploaded successfully', image: newImage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to upload image' });
    }
});
// GET route to retrieve all images
router.get('/api/images', async (req, res) => {
    try {
        const images = await Image.find();
        res.json({ images });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to retrieve images' });
    }
});


module.exports = router;
