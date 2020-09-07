import React, {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { updateUserAction } from '../actions/userActions'



const UserEdit = () => {   
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [user, setOneUser] = useState({
        _id: '',
        name: '',
        phone: '',
        email: '',
        contact_type: ''
    })

    const userOne = useSelector(state => state.users.user)

    const [ personal, setPersonal ] =  useState(userOne.contact_type === 'personal' ? 'checked': null)
    const [ professional, setProfessional] = useState(userOne.contact_type === 'professional' ? 'checked': null)

    
    

    
    useEffect( () => {
        setOneUser(userOne)
    }, [setOneUser] )

    console.log("el unico usuario, ", userOne)   
    if(!userOne) return null;

    const onChangeBoxPer = e => {
        
        
        console.log("el cambio es checked", e.target.checked)
        if(e.target.checked){
            setOneUser({
                ...user, 
                contact_type: 'personal'
            })
            setPersonal('checked')
            setProfessional(null)
        }else{
            setOneUser({
                ...user, 
                contact_type: ''
            })
            setPersonal(null)
        }
        
        
    }

    const onChangeBoxPro = e => {     
           
        console.log("el cambio es checked", e.target.checked)
        if(e.target.checked){
            setOneUser({
                ...user, 
                contact_type: 'professional'
            })
            setProfessional('checked')
            setPersonal(null)
        }else{
            setOneUser({
                ...user, 
                contact_type: ''
            })
            setProfessional(null)
        }
        
 
    }

    const updateUser = (useredit) => dispatch( updateUserAction(useredit) )

    const onSubmit = (e) => {
        
        if(personal){
            setOneUser({
                ...user,
                contact_type: 'personal'
            })
        }else{
            setOneUser({
                ...user,
                contact_type: 'professional'
            })
        }

        console.log("Los datos son ", user)
        
        updateUser(user)

        history.push("/")
        
        e.preventDefault();
        
    }

    
    
   


    return (
        <div className="row justify-content-center">
        <div className="col-md-4">
            <div className="card">
                <div className="card-body">
                <h5>Editar Usuario</h5>
                   <form
                        onSubmit={onSubmit}
                    >
                        <div className="form-group">                                
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={user.name}
                               onChange={ e => setOneUser({...user, name: e.target.value})}
                            />
                        </div>

                        <div className="form-group">                            
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="E-mail"
                                name="email"
                                value={user.email}   
                                onChange={ e => setOneUser({...user, email: e.target.value})}                                 
                            />
                        </div>

                        <div className="form-group">                            
                            <input 
                                type="number"
                                className="form-control"
                                placeholder="Phone"
                                name="phone"
                                value={user.phone}       
                                onChange={ e => setOneUser({...user, phone: e.target.value})}                             
                            />
                        </div>

                        <div class="form-check">
                            <input 
                            checked={personal} 
                            onChange={onChangeBoxPer} 
                            type="checkbox" value="1" className="form-check-input" id="exampleCheck1" />
                            <label  class="form-check-label" style={{marginRight: 30}}>Personal</label>

                            <input 
                            checked={professional} 
                            onChange={onChangeBoxPro} 
                            type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label  class="form-check-label" >Professional</label>
                        </div>
                        <button type="submit" className="btn btn-primary form-control" >Actualizar</button>
                    </form>                           
                </div>
           
                <span className="alert alert-danger p2 mt-8 text-center">Hubo un error</span>
                    
            </div>
        </div>
    </div>
    
    )
}
export default UserEdit;