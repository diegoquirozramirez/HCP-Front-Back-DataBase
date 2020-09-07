import React, { Fragment } from 'react';
import NavBar from './Componentes/navbar'
import Home from './user'
import userNuevo from './Componentes/userNuevo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import userEdit from './Componentes/userEdit';

import { Provider } from 'react-redux'
import store from './store'

function App () {
  return (
    <Router>
      <Provider store={store}>
      <NavBar />      
        <Switch>
          <Route exact path="/" component={userNuevo} />
          <Route exact path="/user/edit" component={userEdit} />
        </Switch>
        <Home />
      </Provider>
    </Router>
  )
} 

export default App;
