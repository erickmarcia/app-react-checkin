import React from 'react';
import './App.css';
import NavBar from './components/nav-bar';
import ButtomComponent from './components/buttom';
 import TimeList from './components/times-list';

function App() {  

  return (
    <div className="App">
       <NavBar/> 
       <h1 className=''>App React JS -  Checking</h1> 
      <ButtomComponent />
      <TimeList />
     </div>
  );
}

export default App;