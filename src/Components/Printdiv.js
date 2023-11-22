import React from 'react'
import './TextFormStyle.css'
function Printdiv(props) {
  return (
    <div className="printTextarea" >
        <p style={{fontSize:"props.textsize"}}> {props.text}</p>
   </div>
  )
}
export default Printdiv;