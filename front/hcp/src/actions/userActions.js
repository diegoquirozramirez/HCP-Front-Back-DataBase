import {
    USER_CARGAR,
    USER_CARGAR_EXITOSO,
    USER_CARGAR_ERROR,

    USER_NUEVO,
    USER_NUEVO_EXITOSO,
    USER_NUEVO_ERROR,

    GET_ONE_USER_EDITAR,
    GET_ONE_USER_EDITAR_EXITO,
    GET_ONE_USER_EDITAR_ERROR,

    GET_ONE_USER_ELIMINAR
} from '../types'


import axiosClient from '../config/axios'


export function cargarUsuarios(){
    return async (dispatch) => {
        try {
            console.log("execute get all user")
            const {data} = await axiosClient.get('/user/alluser')
            dispatch( getAllUser(data) )
        } catch (error) {
            console.log("Error para traer usuarios")
        }
    }
}

const getAllUser = users => ({
    type: USER_CARGAR,
    payload: users
})


export function nuevoUsuario(usuario){
    return async (dispatch) => {
        //console.log("datos de entrada ", usuario)
        try {            
            await axiosClient.post('/user/newuser', usuario)
            const {data} = await axiosClient.get('/user/alluser')
            dispatch( getAllUser(data) )
        } catch (error) {
            console.log("Error para guardar nuevo usuario")
        }        
    }
}

export function getOneUserAction (id) {
    return async (dispatch) => {
        try {            
            dispatch( getOneUser(id) )
        } catch (error) {
            console.log("Error para traer datos para eliminar")
        }
        
    }
}

const getOneUser = (id) => ({
    type: GET_ONE_USER_EDITAR,
    payload: id
})

export function updateUserAction(user){
    return async (dispatch) => {
        try {
            console.log("el usuario en actions ", user)            
            await axiosClient.put(`/user/updateoneuser`, user)
            const {data} = await axiosClient.get('/user/alluser')
            dispatch( editarUser(data) )
        } catch (error) {
            console.log("Error para actualizar datos", error)
        }
    }
}

const editarUser = user => ({
    type: GET_ONE_USER_EDITAR_EXITO,
    payload: user
})


export function deleteOneUserAction(id){
    return async (dispatch) => {
        try {
            dispatch( deleteUser(id) )
            await axiosClient.delete(`/user/deleteoneuser/${id}`) 
        } catch (error) {
            console.log("Error para eliminar un usuario")
        }
    }
}

const deleteUser = id => ({
    type: GET_ONE_USER_ELIMINAR,
    payload: id
})