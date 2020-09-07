const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')
const port = process.env.PORT || 5000
const app = express();
const routerUser = require('./routers/route')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');


var whiteList = [`${process.env.DOMAIN_CROSS_ALLOW}`];
var corsOptions = {
    origin: function (origin, callback){
        if(  whiteList.indexOf(origin) != -1 ){
            callback(null,true)
        }else{
            callback(new Error('Not Allowed by CORS'))
        }
    }
}

app.use(cors());
app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {    
    res.status(200).json({
        codRes: "0",
        message: "Oka"
    })   
})

app.use('/user', routerUser)
app.get('/swagger', (req,res) => {
    try {
        res.sendFile('swagger/swagger.json', {root: __dirname})
    } catch (error) {
        console.log("Error con la documentacion Swagger", error);
        res.json({
            codRes: "99",
            message: "Error con la documentacion"
        })
    }
})


app.listen(port, () => {
    console.log(`Server run on pot ${port}`)
})
