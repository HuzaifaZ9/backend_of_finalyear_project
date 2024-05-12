const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/kidswatch')
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

const videoSchema = new mongoose.Schema({
    title: String,
    url: String
});

const Video = mongoose.model('Video', videoSchema);

app.post('/api/videos', async (req, res) => {
    try {
        const { title, url } = req.body;
        const video = new Video({ title, url });
        await video.save();
        console.log('Received a POST request at /api/videos');
        res.json({ message: 'Video inserted into the collection' });
    } catch (error) {
        console.error('Error inserting video:', error);
        res.status(500).json({ error: 'An error occurred while inserting the video.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
