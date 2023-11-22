
import './App.css';
import Navbar from './Components/Navbar';
import TextFrom from './Components/TextFrom';
import React from 'react';



function App() {
  return (
    <div >
      <Navbar text="this is the nav bar" co={789} />
      <div className="container my-5"> <TextFrom /></div>
     
    </div>
  );
}



export default App;
