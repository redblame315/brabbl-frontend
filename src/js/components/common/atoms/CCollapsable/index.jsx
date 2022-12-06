import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CCollapsable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: !props.opened
      }
    }
    onCollapse = () => {
      this.setState({collapsed: !this.state.collapsed})
    }
    render () {
        const props = this.props;
        return <div className="collapsable-section">
          <a onClick={()=>{this.onCollapse()}} className={"collapsable-section-title"}>
            <h2>
              <i className={this.state.collapsed ? 
                "icon fa fa-caret-right"
                : "icon  fa fa-caret-down"}/> {this.props.title}
            </h2>
          </a>
          <div className={this.state.collapsed? "collapsable-body hidden": "collapsable-body"}>
            {props.children}
          </div>
        
        </div>

    }
}

CCollapsable.propTypes = {
    title: PropTypes.string,
    opened: PropTypes.bool
};
  

export default CCollapsable