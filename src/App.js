import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import Homepage from './pages/homepage/homepage.component';
import BankDetails from './pages/bank-details/bank-details.component';
import Favorites from './pages/favorites/favorites.component'
import Error404 from './pages/error/error-404.component';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={()=><Redirect to="/all-banks"/>}/>
        <Route exact path='/all-banks' component={Homepage} />
        <Route exact path='/all-banks/:ifsc' component={BankDetails}/>
        <Route exact path='/favorites' component={Favorites}/>
        <Route component={Error404}/>
      </Switch> 
    
    </div>
  );
}

export default App;
