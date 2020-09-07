import React from 'react'
import PropTypes from 'prop-types';
import {store} from './store'
import { useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom'
import Grid from  '@material-ui/core/Grid'
import {useSelector} from 'react-redux'



export default class User extends React.Component{ 

    constructor(props){
        super(props)
        this.deleteUser = this.deleteUser.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePhone = this.handleChangePhone.bind(this)
        this.handleChangeTypePersonal = this.handleChangeTypePersonal.bind(this)
        this.handleChangeTypeProfessional = this.handleChangeTypeProfessional.bind(this)
        this.editSubmit = this.editSubmit.bind(this)
  
    }

    state = {
        users: [],
        edit: false,
        counter: '',
            _id: "",
            name: "",
            phone: "",
            email: "",
            contact_type: "",
            type_professional: false,
            type_personal: false
        
    }

    

    executePrime = async () => {
        const res = await store.storeUser.allUser();
        console.log("respuesta del usuarios", res)
        this.setState({
            users: res.message
        })
    }

    componentDidMount(){
        this.executePrime()
        const counter = useSelector(state => state.counter);        
        //const isLogged = useSelector(state => state.isLogged)
        
    }

    handleChangeName = e => {
        //console.log("el apellido es ", e.target.value)
        this.setState({
            name: e.target.value
        })
    }

    handleChangePhone = e => {
        //console.log("el apellido es ", e.target.value)
        this.setState({
            phone: e.target.value
        })
    }

    handleChangeEmail = e => {
        //console.log("el apellido es ", e.target.value)
        this.setState({
            email: e.target.value
        })
    }

    handleChangeTypePersonal = e => {
        //console.log("el apellido es ", e.target.value)
        this.setState({
            type_personal: e.target.checked,
            type_professional: false
        })
        if(e.target.checked){
            this.setState({
                contact_type: "personal",
                type_professional: false
            })
        }
    }

    handleChangeTypeProfessional = e => {
        this.setState({
            type_professional: e.target.checked,
            type_personal: false
        })
        if(e.target.checked){
            this.setState({
                contact_type: "professional",
                type_personal: false
            })
        }
    }

    setUser(_id){
        //this.props.history.push("/edit")
        const res = this.state.users.find( v => v._id == _id)
        
        console.log("datos", res)
        this.setState({
            edit: true,
            _id: res._id,
            name: res.name,
            email: res.email,
            phone: res.phone,
            contact_type: res.contact_type
        })
        if(res.contact_type == "personal"){
            this.setState({
                type_personal: true
            })
        }else{
            this.setState({
                type_professional: true
            })
        }
        
    }

    deleteUser = async (_id) => { 
        console.log("el id es ", _id)
        const res = await store.storeUser.deleteOneUser(_id);
        console.log("elimino? ", res)
        this.executePrime()

    }

    onSubmit = async (e) => {
        e.preventDefault();
        
        console.log("datos", this.state.name + this.state.email + this.state.phone + this.state.contact_type)
        const dataForm = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            contact_type: this.state.contact_type
        }
        const res =  await store.storeUser.newUser(dataForm)
        console.log("respuesta a guardado ", res)
        this.setState({
            edit: false,
            _id: "",
            name: "",
            email: "",
            phone: "",
            contact_type: "",
            type_personal: false,
            type_professional: false
        })
        this.executePrime()
    }

    editSubmit = async (e) => {
        e.preventDefault();
        
        console.log("datos edit", this.state._id + this.state.name + this.state.email + this.state.phone + this.state.contact_type)
        const dataForm = {
            _id: this.state._id,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            contact_type: this.state.contact_type
        }
        const res =  await store.storeUser.updateOneUser(dataForm)
        console.log("respuesta a guardado ", res)
        this.setState({
            edit: false,
            _id: "",
            name: "",
            email: "",
            phone: "",
            contact_type: "",
            type_personal: false,
            type_professional: false
        })
        this.executePrime()
    }
    
    render() {
        //const {getOneUser} = this.props;
        return (
            <div>
            <Grid
            container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '50vh' }}

            >
            <Grid item xs={6} >
                    <h1></h1>
                    <form 
                    
                    onSubmit={ !this.state.edit ? this.onSubmit : this.editSubmit}
                    >
                    <div className="form-group">
                    
                        <input value={this.state.name} onChange={this.handleChangeName}  type="text" placeholder="Name"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group">
                   
                        <input value={this.state.email} onChange={this.handleChangeEmail} type="text" placeholder="E-mail" className="form-control" id="exampleInputPassword1" />
                        
                    </div>
                    <div className="form-group">
                       
                        <input value={this.state.phone} onChange={this.handleChangePhone} type="text" placeholder="Phone" className="form-control" id="exampleInputPassword1" />
                        
                    </div>
                    <div class="form-check">
                        <input value={this.state.type_personal} onChange={this.handleChangeTypePersonal} type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label  class="form-check-label" for="exampleCheck1" style={{marginRight: 30}}>Personal</label>

                        <input value={this.state.type_professional} onChange={this.handleChangeTypeProfessional} type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Professional</label>
                    </div>


                    <input type="submit" value={!this.state.edit ? 'Add contact' : 'Edit contact'} className="btn btn-primary form-control"/>
                    </form>
            </Grid>
            <Grid item>
                <div className="container" style={{maxWidth: 500}}>
                {this.state.users.length > 0 ? (
                    
                    this.state.users.map( (v, k) => (
                        <div className="row" style={{backgroundColor: '#D8D8D8', padding: 15, margin: 5}}>
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
                                <button style={{margin: 5, backgroundColor: '#565555', color: 'white'}} onClick={ () => this.setUser(v._id) } className="btn btn">Edit</button>
                                <button style={{margin: 5}}  onClick={() => this.deleteUser(v._id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    ))
                    
                ): null }
                </div>
            </Grid>
                {/* {this.state.users.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">created_at</th>
                                <th scope="col"> Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.users.map( (v, k) => (
                                    <tr key={k}>
                                        <th scope="row">{v._id}</th>
                                        <td>{v.first_name}</td>
                                        <td>{v.last_name}</td>
                                        <td>{v.created_at}</td>
                                        <td><Link to="/edit"><button onClick={ () => this.setUser(v._id) } className="btn btn-success">Editar</button></Link></td>
                                        <td><button onClick={() => this.deleteUser(v._id)} className="btn btn-danger">Eliminar</button></td>
                                    </tr>
                                ) )
                            }
                                
                            </tbody>
                        </table>
                        
                    ): (
                        <div>No tiene usuarios</div>
                    )}  */}
            </Grid>
                
                
            </div>
        )
    }
}

/* User.propTypes = {
    users: PropTypes.array
} */