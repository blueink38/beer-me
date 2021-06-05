import React, { useState } from 'react';
import Modal from 'react-modal';
import { directions } from '../../utils/API'
import { List } from 'semantic-ui-react'


function PopUpDirections(props) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [completeDirections, setCompleteDirections] = useState([])
  const [localSearch, setLocalSearch] = useState(false)
  const getDirections = () =>{
    const completedDirections = directions(props.lat, props.lon)
    setCompleteDirections(completedDirections)
    console.log(completeDirections)
  }
    if(modalIsOpen){ 
        return (
            <div>
                <Modal 
                    isOpen={modalIsOpen} 
                    onRequestClose={() => setModalIsOpen(false)}
                    appElement={document.getElementById('root') || undefined}
                >
                    <List>
                    {modalIsOpen ?
                        <button onClick={() => setLocalSearch(true)}> Directions from current location </button> 
                    : ""}
                    {localSearch ? 
                        completeDirections.map((stop) => {
                            return(
                                <List.Item key={stop} >
                                    <strong>{stop}</strong>
                                </List.Item> 
                            ) 
                        })
                    : ""}
                    </List>
                    <button onClick={() => setModalIsOpen(false)}>Close Directions</button>
                </Modal>
            </div>
          )
    } else {
        return(<p style={{color:'#f2f0f0'}} onClick={() => (setModalIsOpen(true), getDirections())}>get directions</p>)
    }
}

export default PopUpDirections