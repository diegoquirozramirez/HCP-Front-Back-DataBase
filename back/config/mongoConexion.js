const mongoose = require('mongoose')

class ConexionMongo {

    conection = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URL_CONECTION,          
            { useNewUrlParser: true , useUnifiedTopology: true });
            console.log("se conecto al mongo!")
        } catch (error) {
            console.log("Error para conectar con el mongo!")
        }        
    }

    close = async () => {
        try {
            await mongoose.connection.close();
            console.log("se cerro la conexion")
        } catch (error) {
            console.log("Error para cerrar conexion mongo!")
        }
    }
}

module.exports = {
    ConexionMongo
}