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

const initialState = {
    users: [],
    error: false,
    loading: false,
    user: null
}

export default function(state = initialState, action){
    switch(action.type){        
        case USER_CARGAR:            
            return {
                error: false,
                users: action.payload.message,
                loading: true
            }
        case USER_NUEVO:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case GET_ONE_USER_EDITAR:            
            return {                
                ...state, 
                user: {},                   
                user: state.users.find( v => v._id === action.payload ),                
                users: [...state.users]
            }
        case GET_ONE_USER_EDITAR_EXITO:
            return {
                ...state,                
                users: action.payload.message
            }
        case GET_ONE_USER_ELIMINAR:
            return {
                ...state,
                users: state.users.filter( v => v._id !== action.payload),
                user: {}
            }
        default:
            return state
    }
}