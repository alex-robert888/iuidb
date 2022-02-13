import React, { useState } from 'react';
import './Popup.css';

interface Popup {
  title: string,
  description: string,
  isOpen: boolean,
  onCancel: () => void,
  onFinish: () => void
}

const Popup: React.FC<Popup> = (props) => {
  return (
    <div className={`
      popup
      ${props.isOpen ? '' : 'hidden'}
    `}>
      <div className='popup__content'>
        <h2 className='text-large'>{ props.title }</h2>
        <p> { props.description }</p>
        <br />
        <div className='flex-col'>
          { props.children }
        </div>
        <br />
        <div className='flex-row'>
          <button className='button button-white button-small' onClick={ () => props.onCancel() }>Cancel</button>
          <button className='button button-purple pull-right button-small' onClick={ () => { props.onFinish(); props.onCancel(); }  }>Finish</button>
        </div>
      </div>
    </div>
  )
}

export default Popup;