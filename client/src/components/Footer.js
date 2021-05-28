import React, { Component } from 'react';
export default class Footer extends Component {
  render() {
    return (
<div class="ui horizontal segments">
  <div class="ui grey inverted segment">
    <h4>Site Builders</h4>
    <div class="ui link list">
  <a class="item">Cory N.</a>
  <a class="item">Frank D.</a>
  <a class="item">Jason F</a>
  <a class="item">Juan N.</a>
  <a class="item">Ramon F.</a>
</div>
  </div>
  <div class="ui grey inverted segment">
    <h4>Something here Perhaps?</h4>
  </div>
  <div class="ui grey inverted segment">
    <h3>Thanks For Visiting Our Site!</h3>
  </div>
</div>
    );
  }
}