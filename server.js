const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 8000;
const DB = 'houseplant_tinder';
const cookieParser = require('cookie-parser')

require('./server/config/mongoose.config')(DB);
require('dotenv').config()

app.use(cookieParser());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(),express.urlencoded({extended: true}));


require('./server/routes/plant.routes')(app)
require('./server/routes/user.routes')(app)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));