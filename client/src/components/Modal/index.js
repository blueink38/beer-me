import React, { useState } from 'react';
import Modal from 'react-modal';
import { directions } from '../../utils/API'
import { List, Grid } from 'semantic-ui-react'


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
                    contentLabel="Inline Styles Modal Example"
                    style={{
                      overlay: {
                        backgroundColor:'',
                        height:'95%',
                        width:'50%',
                        opacity:'100%',
                        marginTop:'100px',
                        marginLeft:'25%'
                      },
                      content: {
                        backgroundColor:'#ccccc8',
                        color: 'black',
                        scroll: 'none',
                        height:'85%',
                        margin:'0'
                        }
                      }}
                >
                <Grid centered columns={4}>
                    <Grid.Column>
                        <List>

                        {modalIsOpen ?
                            <button  
                            onClick={() => setLocalSearch(true)}
                            className="ui large yellow button">
                            Directions from current location 
                            </button> 
                            
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
                        <br></br>
                            <button 
                            onClick={() => setModalIsOpen(false)}
                            className="ui large yellow button">
                            Close Window
                            </button>
                    </Grid.Column>
                </Grid>

                </Modal>

            </div>

          )
    } else {
        return(<p style={{color:'#ffffff'}} onClick={() => (setModalIsOpen(true), getDirections())}>get directions</p>)
    }
}

export default PopUpDirections
