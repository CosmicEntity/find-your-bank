import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import SideMenu from './components/side-menu/side-menu.component'
import Homepage from './pages/homepage/homepage.component';
import BankDetails from './pages/bank-details/bank-details.component';
import Favorites from './pages/favorites/favorites.component'
import './App.css';

function App() {
  return (
    <div className="App">
      <SideMenu/>
      <Switch>
        <Route exact path="/" render={()=><Redirect to="/all-banks"/>}/>
        <Route exact path='/all-banks' component={Homepage} />
        <Route exact path='/all-banks/:ifsc' component={BankDetails}/>
        <Route exact path='/favorites' component={Favorites}/>
      </Switch> 
    
    </div>
  );
}

export default App;
