/** Middleware for validate input data comming */

inCommingData = (req, res, next) => {
    try {
        if (!req.body){
            res.json({
                codRes: '01',
                message: 'contiene campos vacios'
            })
        }else{
            next();
        }
    } catch (error) {
        console.log("Error para validar campos de entrada!")
        res.status(500).json({
            codRes: '99',
            message: `Error inside catch ${error}`
        })
    }
}


module.exports = {
    inCommingData
}