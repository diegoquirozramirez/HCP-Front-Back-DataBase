const userModel = require('../config/models/userModel');
const mc = require('../config/mongoConexion')

/** METODOS CRUD */

/** LIST ALL USERS */
allUsers = async (req, res) => {
    try {
        cone = new mc.ConexionMongo();
        cone.conection();

        const userAll = await userModel.find({});

        console.log("todos los usuarios", userAll)

        res.json({
            codRes: '00',
            message: userAll
        })

        cone.close();
    } catch (error) {
        console.log("Error en function allUsers controller");
        cone.close();
        res.json({
            codRes: '99',
            message: 'Error en function allUsers controller'
        })
    }
}
 
/** CREATE A NEW USER */
newUser = async (req, res) => {
    try {
       
        console.log("el cuerpo del envio ", req.body)
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const contact_type = req.body.contact_type;

        cone = new mc.ConexionMongo();
        cone.conection();

        const newUserModel = new userModel({
            name : name,
            email : email,
            phone : phone,
            contact_type : contact_type,
            created_at: Date.now()
        })

        await newUserModel.save();    
        
        res.json({
            codRes: '00',
            message: 'Se guardo'
        })

        cone.close();

    } catch (error) {
        console.log("Error en function newUser controller");
        cone.close();
        res.json({
            codRes: '99',
            message: 'Error en function newUser controller'
        })
    }
}

/** GET ONE USER SPEC */

getOneUser = async (req, res) => {
    try {
        cone = new mc.ConexionMongo();
        cone.conection();

        const id = req.body._id;
        const oneUser = await userModel.findOne({ _id: id });
        if(oneUser){
            res.json({
                codRes: '00',
                message: oneUser
            })            
        }else{
            res.json({
                codRes: '01',
                message: "No se existe usuario"
            })            
        }
        cone.close();
    } catch (error) {
        console.log("Error en function getOneUser controller")
        cone.close();
        res.json({
            codRes: '99',
            message: 'Error en function getOneUser controller'
        })
    }
}

/** UPDATE ONE USER SPEC */

updateOneUser = async (req, res) => {
    try {
        cone = new mc.ConexionMongo();
        cone.conection();

        const id = req.body._id;
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const contact_type = req.body.contact_type;
        const query = {_id: id}
        
        const userUpdated = await userModel.updateOne(
            query,
            {
                $set: {
                    name: name,
                    email: email,
                    phone: phone,
                    contact_type:contact_type
                }
            }
        )

        console.log("actualizacion", userUpdated)

        res.json({
            codRes: '00',
            message: userUpdated
        })

        cone.close();
    } catch (error) {
        console.log("Error en function updateOneUser controller")
        cone.close();
        res.json({
            codRes: '99',
            message: 'Error en function updateOneUser controller'
        })
    }
}

/** DELETE ONE USER SPEC */

deleteOneUser = async (req, res) => {
    try {
        cone = new mc.ConexionMongo();
        cone.conection();

        const id = req.params.id;
        const userDeleted = await userModel.deleteOne({_id: id});
        console.log("user deleted", userDeleted);

        res.json({
            codRes: '00',
            message: userDeleted
        })
        
        cone.close();
    } catch (error) {
        console.log("Error en function deleteOneUser controller")
        cone.close();
        res.json({
            codRes: '99',
            message: 'Error en function deleteOneUser controller'
        })
    }
}


module.exports = {
    allUsers,
    newUser,
    getOneUser,
    updateOneUser,
    deleteOneUser
}