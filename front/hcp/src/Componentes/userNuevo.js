import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { nuevoUsuario } from '../actions/userActions'

const UserNuevo = () => {

    const dispatch = useDispatch();

    const [ usuario, nuevoUserForm ] = useState({
        name: '',
        phone: '',
        email: '',
        contact_type: ''
    })

    const [ personal, setPersonal ] = useState(null)
    const [ professional, setProfessional] = useState(null)


    const onChangeBoxPer = e => {
        
        console.log("el cambio es checked", e.target.checked)
        if(e.target.checked){
            nuevoUserForm({
                ...usuario, 
                contact_type: 'personal'
            })
            setPersonal('checked')
            setProfessional(null)
        }else{
            nuevoUserForm({
                ...usuario, 
                contact_type: ''
            })
            setPersonal(null)
        }
        
        
    }

    const onChangeBoxPro = e => {        
        console.log("el cambio es checked", e.target.checked)
        if(e.target.checked){
            nuevoUserForm({
                ...usuario, 
                contact_type: 'professional'
            })
            setProfessional('checked')
            setPersonal(null)
        }else{
            nuevoUserForm({
                ...usuario, 
                contact_type: ''
            })
            setProfessional(null)
        }
        
 
    }

    const agregar = (usuarionuevo) => dispatch( nuevoUsuario(usuarionuevo) )

    const onSubmit = e => {
        
        //console.log("los datos son : ", usuario.name + " "+ usuario.phone + " "+ usuario.email + " " + usuario.contact_type)
        e.preventDefault();
        agregar({
            name: usuario.name,
            phone: usuario.phone,
            email: usuario.email,
            contact_type: usuario.contact_type

        });

        nuevoUserForm({
            name: '',
            phone: '',
            email: '',
            contact_type:''
        })

        setPersonal(null)
        setProfessional(null)
       
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                    <h5>Nuevo usuario</h5>
                       <form
                            onSubmit={onSubmit}
                        >
                            <div className="form-group">                                
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    value={usuario.name}
                                   onChange={ e => nuevoUserForm({...usuario, name: e.target.value})}
                                />
                            </div>

                            <div className="form-group">                            
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="E-mail"
                                    name="email"
                                    value={usuario.email}   
                                    onChange={ e => nuevoUserForm({...usuario, email: e.target.value})}                                 
                                />
                            </div>

                            <div className="form-group">                            
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Phone"
                                    name="phone"
                                    value={usuario.phone}       
                                    onChange={ e => nuevoUserForm({...usuario, phone: e.target.value})}                             
                                />
                            </div>

                            <div class="form-check">
                                <input checked={personal} onChange={onChangeBoxPer} type="checkbox" value="1" className="form-check-input" id="exampleCheck1" />
                                <label  class="form-check-label" style={{marginRight: 30}}>Personal</label>

                                <input checked={professional} onChange={onChangeBoxPro} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label  class="form-check-label" >Professional</label>
                            </div>
                            <button type="submit" className="btn btn-primary form-control" >Agregar</button>
                        </form>                           
                    </div>
               
                    <span className="alert alert-danger p2 mt-8 text-center">Hubo un error</span>
                        
                </div>
            </div>
        </div>
        
        
    )
}

export default UserNuevo;