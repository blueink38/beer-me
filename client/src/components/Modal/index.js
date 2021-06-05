import React, { useState } from 'react';
import Modal from 'react-modal';
import { directions } from '../../utils/API'
import { List } from 'semantic-ui-react'

function PopUpDirections(props) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
    if(modalIsOpen){ 
        const completeDirections = directions(props.lat, props.lon)
        console.log(completeDirections)
        return (
            <div>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} appElement={document.getElementById('root') || undefined}>
                    <List>
                    {modalIsOpen ? 
                        completeDirections.map((stop) => {
                            return(
                                <List.Item>
                                    <strong>{stop.value}</strong>
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
        return(<p style={{color:'#f2f0f0'}} onClick={() => setModalIsOpen(true)}>get directions</p>)
    }
}

export default PopUpDirections
