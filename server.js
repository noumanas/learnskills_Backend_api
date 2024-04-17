const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Song State API Live!")
});

app.get('/stats/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const config = {
            headers: {
                apiKey: process.env.APIKEY
            }
        }
        const response = await axios.get(`https://api.songstats.com/enterprise/v1/artists/stats?&source=spotify,applemusic,deezer,tiktok,youtube&spotify_artist_id=${id}`, config);
        res.json(response.data);
    }
    catch(error) {
        res.send(error)
    }
});

app.get("/spotify/:id", async (req, res) => {
    const id = req.params.id;
    const config = {
        headers: {
            apiKey: process.env.APIKEY
        }
    }
    const response = await axios.get(`https://api.songstats.com/enterprise/v1/artists/catalog?&source=spotify,applemusic,deezer,tiktok,youtube,soundcloud&spotify_artist_id=${id}`, config);
    res.json(response.data);
});

app.get("/spotify/tracks/:track_id/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const songstats = req.params.track_id
        const config = {
            headers: {
                apiKey: process.env.APIKEY
            }
        }
        const response = await axios.get(`https://api.songstats.com/enterprise/v1/tracks/stats?songstats_track_id=${songstats}?&source=spotify,applemusic,deezer,tiktok,youtube,soundcloud&spotify_artist_id=${id}`, config);
         res.json(response.data);
    }
    catch(error) {
        res.send(error)
    }    
    
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Songstats Service: Listening: ${PORT}`));