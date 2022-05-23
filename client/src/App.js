import React from 'react'
import {Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
// import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

function App() {
  return (
    <Router>
   <Container maxidth="lg" >
     <Navbar/>
     <Switch>
       <Route path="/" exact  component={Home} />
       <Route path="/auth" exact  component={Auth} />
     </Switch>
   </Container>
   </Router>
  
  )
}

export default App