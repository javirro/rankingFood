const express = require('express');
const cors = require('cors')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
    // set static folder
app.use(express.static('front-end'))

app.use('/cheesecake', require('./routes/cheesecake'));
app.use('/burger', require('./routes/burger'));


app.listen(PORT, () => {
    console.log("Registrar-Server running in port " + PORT);
});