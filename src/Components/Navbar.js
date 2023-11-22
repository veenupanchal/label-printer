import React from 'react'
import PropTypes from 'prop-types'
export default function Navbar(props) {
  return (
    <div>
     {props.text} {props.co}
    </div>
  )

 
}
Navbar.propTypes={
    text:  PropTypes.string.isRequired,
    co: PropTypes.number}
Navbar.defaultProps={
    text: "this is the default text",
    co: 123
}