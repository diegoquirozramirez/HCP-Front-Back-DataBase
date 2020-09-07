import React, { Fragment, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { cargarUsuarios, getOneUserAction, deleteOneUserAction } from './actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


const User = () => {
    
    const dispatch = useDispatch();
    const history = useHistory();
    //dispatch( cargarUsuarios() )

    useEffect( () => {
        const getAllUsers = () => dispatch( cargarUsuarios() )
        getAllUsers()
    }, [] )
    

    const users = useSelector( state => state.users.users )  
    if(!users) return null; 

    

    const editUser = (user) => {       
        
        const getOneUser = () => dispatch( getOneUserAction(user._id) ) 
        getOneUser();

        history.push({pathname:  `/user/edit`})

    }


    const deleteUserOne = (id) => dispatch( deleteOneUserAction(id) )

    const deleteUser = id => {
        deleteUserOne(id)
    }


    return (
        <Fragment>
            <Grid
            container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '50vh' }}

            >
         
            <Grid item>
                <div className="container" style={{maxWidth: 500}}>
                
                {users.length > 0 ? (
                    
                    users.map( (v, k) => (
                        <div key={k} className="row" style={{backgroundColor: '#D8D8D8', padding: 15, margin: 5}}>
                            <div className="col-9" style={{padding: 5}}>
                                <span style={{color: 'blue'}}>{v.name}</span>
                            </div>  
                            <div className="col-3" style={{padding: 5}}>
                                <span style={{backgroundColor: 
                                 
                                    v.contact_type == 'professional' ? '#54B954' : '#0F468B', padding: 10, color: 'white'}}>{v.contact_type}</span>
                            </div>                      
                       
                            <div className="col-12" style={{padding: 5}}>
                                {v.email}
                            </div>  
                            <div className="col-12" style={{padding: 5}}>
                                {v.phone}
                            </div>
                            <div >
                                <button onClick={() => editUser(v)} style={{margin: 5, backgroundColor: '#565555', color: 'white'}}  className="btn btn">Edit</button>
                                <button style={{margin: 5}} onClick={() => deleteUser(v._id)}  className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    ))
                    
                ): null }
                </div>
            </Grid>
            
            </Grid>
        </Fragment>
    )
}

export default User;