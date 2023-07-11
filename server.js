const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const submissionRoutes = require('./routes/submissionRoutes');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect('mongodb://127.0.0.1:27017/addictive-media', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'input.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/countries', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'countries.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const countries = JSON.parse(data);
      res.json(countries);
    }
  });
});

app.use('/api/submit', submissionRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
