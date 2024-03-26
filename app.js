const express = require('express')
const app = express()
const path = require('path')
const axios = require('axios')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/home', async (req, res) => {
    res.render('home')
})

app.get('/getMemes', async (req, res) => {
    try {
        const response = await axios.get('https://www.reddit.com/r/memes/top.json?limit=20&t=day');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Reddit:', error);
        res.status(500).json({ error: 'Error fetching data from Reddit' });
    }
});

app.listen('3000', () => {
    console.log('app listening on port 3000')
})

