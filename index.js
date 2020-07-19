const express = require('express');
const app = express();

const PORT = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.send('hi');
});

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});
