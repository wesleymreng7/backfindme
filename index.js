require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const db = require('./src/utils/db')

//Models
const Clients = require('./src/models/clients')(db)
const Contributors = require('./src/models/contributors')(db)


//Routes
const clients = require('./src/routes/clients');
const contributors = require('./src/routes/contributors');

try {
    const models = {
        Clients,
        Contributors
    };

    app.use(
        cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'Business'],
            exposedHeaders: ['Business'],
        })
    );
    app.use('/images', express.static(__dirname + '/images'));
    app.use(express.json())
    app.use('/v1/clients', clients(models));
    app.use('/v1/contributors', contributors(models));

    app.listen(port,  async () => {
        console.log('CRUD listening on port: ' + port);
    });

} catch (e) {
    console.log(e)
}
