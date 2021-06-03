import React, { Component } from 'react';
export default class Footer extends Component {
  render() {
    return (
<div className="ui horizontal segments">
  <div style={{textAlign: "center" ,color:'#ebba34'}} className="ui black inverted segment">
    <h4 style={{textAlign: "center" ,color:'#ebba34'}}>Site Builders</h4>
    <div  className="ui link list">
  
  <a style={{textAlign: "center" ,color:'#ebba34'}}className="item" href="https://github.com/rocketorangemen" target="blank">Ramon F.</a>
  <a style={{textAlign: "center" ,color:'#ebba34'}}className="item" href="https://github.com/blueink38" target="blank">Jason F</a>
  <a style={{textAlign: "center" ,color:'#ebba34'}}className="item" href="https://github.com/jnunez1229" target="blank">Juan N.</a>
  <a style={{textAlign: "center" ,color:'#ebba34'}}className="item" href="https://github.com/DragoonKite" target="blank">Frank D.</a>
  <a style={{textAlign: "center" ,color:'#ebba34'}}className="item" href="https://github.com/cocobeware83" target="blank">Cory N.</a>
  



</div>
  </div>

  <div className="ui black inverted segment"><br></br>
    <h2 style={{textAlign: "center" ,color:'#ebba34'}}>Thanks For Visiting Our Site!</h2>
  </div>
</div>
    );
  }
}