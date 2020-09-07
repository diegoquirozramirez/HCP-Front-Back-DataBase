import React from 'react'
import UserList from './user'
export default class Home extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>                
                <UserList />                
            </div>
        )
    }
}