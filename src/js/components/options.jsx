import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class OptionsList extends React.Component {

  constructor(props) {
    super(props);
 
    this.state = {
      optionsVisible: false,
    };
  }

  componentWillMount() {
    document.addEventListener('click', this.onDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick, false);
  }

  onDocumentClick = (e) => {
    if (ReactDOM.findDOMNode(this).contains(e.target)) {
      this.toggleOptions();
    } else {
      this.hideOptions();
    }
  }

  toggleOptions = () => {
    this.setState({ optionsVisible: !this.state.optionsVisible });
  }

  hideOptions = () => {
    this.setState({ optionsVisible: false });
  }

  render() {
    let style = {
      display: this.state.optionsVisible ? 'block' : 'none',
    };
    return (
      <div className="argument-options">
        <span className="argument-options-toggle">
          <i className="fa fa-ellipsis-v"></i>
        </span>
        <ul className="argument-options-list" style={style}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

class Option extends React.Component {

  render() {
    let cssClass = 'fa fa-' + this.props.icon;
    return (
      <li className="argument-option" onClick={this.props.onClick}>
        <i className={cssClass}></i>
        {this.props.children}
      </li>
    );
  }
}

OptionsList.propTypes = {
  children: PropTypes.node.isRequired,
};

Option.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};


export { OptionsList, Option };
