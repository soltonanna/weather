import React from 'react';
import cl from './Input.module.scss';

const Input = (props) => {
  return (
    <input {...props} className={cl.input}/>
  )
}

export default Input;