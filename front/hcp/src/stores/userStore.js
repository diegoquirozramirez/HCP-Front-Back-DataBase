import axios from 'axios'

export default class userStore {

    userForm = {
        first_name: "",
        last_name: ""
    }

    setUserData = (v) => {
        this.userForm = v
    }

    resetUserData = () => {
        this.userForm = {
            first_name: "",
            last_name: ""
        }
    }

    allUser =  async () => {
        try {
            const {data} = await axios.get(
                'http://localhost:5000/user/alluser',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ) 
            return data;
        } catch (error) {
            console.log("Error para listar datos, function allUser")
        }
    };
    
    newUser = async (dataForm) => {
        try {
            const {data} = await axios.post(
                'http://localhost:5000/user/newuser',
                {
                    ...dataForm
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            return data;
        } catch (error) {
            console.log("error para gaurdar nuevo usuario", error)
        }
    }

    getOneUser = async (_id) => {
        try {
            const {data} = await axios.post(
                'http://localhost:5000/user/getoneuser',
                {
                    _id
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            return data;
        } catch (error) {
            console.log("error para getOneUser", error)
        }
    }

    updateOneUser = async (dataForm) => {
        try {
            const {data} = await axios.put(
                'http://localhost:5000/user/updateoneuser',
                {
                    ...dataForm
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            return data;
        } catch (error) {
            console.log("error para getOneUser", error)
        }
    }

    deleteOneUser = async (_id) => {
        try {
            console.log("el iddd ", _id)
            const {data} = await axios.delete(
                `http://localhost:5000/user/deleteoneuser/${_id}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            return data;
        } catch (error) {
            console.log("error para getOneUser", error)
        }
    }

}
