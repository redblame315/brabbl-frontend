import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CAutoHeightAnimator extends Component {
    constructor(props) {
      super(props);
      this.prevHeight = 0;
    }
    componentDidMount() {
      let elWrap = document.getElementById(this.props.divToAnimate)
      let wrect = elWrap.getBoundingClientRect();
      this.prevHeight = wrect.height + 10;
    }
    
    animate = () => {
         // get the current height
         let eAnimator = document.getElementById(this.props.id) 
         let elWrap = document.getElementById(this.props.divToAnimate) 
         let prevHeight = this.prevHeight

         // Set height:auto and get the new height
         let rect = elWrap.getBoundingClientRect();
         let newHeight = rect.height + 10;

         eAnimator.style.height = prevHeight + 'px'
 
         // Start Animation in next Animation frame from original height to new height
         //  Reveal the contents via opacity animation
         requestAnimationFrame(() => { 
            eAnimator.style.height = newHeight + 'px'
            eAnimator.style.transitionDelay = this.props.transitionDelay
         })
         setTimeout(function() { eAnimator.style.height = 'auto'; }, 500);
         this.prevHeight = newHeight
    }
    render () {
        return <div id={this.props.id} className="c-auto-height-animator">
          {this.props.children}            
        </div>

    }
}

export default CAutoHeightAnimator