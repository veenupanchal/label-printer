
import './App.css';
import Navbar from './Components/Navbar';
import TextFrom from './Components/TextFrom';
import React from 'react';
import ruler from './assets/image/ruler.png';


function App() {
  return (
    <div >
      <img src={ruler}  alt="ruler"/>
      <div className="container my-5"> <TextFrom /></div>
     
    </div>
  );
}



export default App;
