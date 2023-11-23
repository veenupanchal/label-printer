
import './App.css';
import Navbar from './Components/Navbar';
import TextFrom from './Components/TextFrom';
import React from 'react';
import ruler from './assets/image/ruler.png';
import rulerVertical from './assets/image/rulerV.png';



function App() {
  return (
    <div >
      <img src={rulerVertical} alt="Vertical ruler" style={{position:"relative"}}></img>
      <img src={ruler}  alt="ruler"/>
      
      <div className="container my-5"> <TextFrom /></div>
     
    </div>
  );
}



export default App;
