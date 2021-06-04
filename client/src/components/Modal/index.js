import React, {useState} from 'react';
import Modal from 'react-modal';
// import completeDirections from '../SearchBreweries'

function PopUpDirections() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)

  return (
<div>
  <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
  <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
    <h2>yupp</h2>
    <p>ya</p>
    <button onClick={() => setModalIsOpen(false)}>Close Modal</button>
  </Modal>
</div>
    
  )
}

export default PopUpDirections
