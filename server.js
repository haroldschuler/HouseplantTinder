const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 8000;
const DB = 'houseplant_tinder';

require('./server/config/mongoose.config')(DB);

app.use(cors());

app.use(express.json(),express.urlencoded({extended: true}));

require('./server/routes/plant.routes')(app)
require('./server/routes/user.routes')(app)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));