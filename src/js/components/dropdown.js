import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Badge from 'react-bootstrap/Badge';

class DropDownItem extends React.Component {

  handleClick = () => {
    this.props.onSelect();
    this.props.select(this);
  }

  render() {
    console.log("Badge");
    console.log(this.props);
    return (      
      
        <li className="dropdown-item" onClick={this.handleClick}>
          {this.props.children}
          <Badge pill bg="danger">
            {this.props.badgeLabel}
          </Badge>
        </li>
      
      // <li className="dropdown-item" onClick={this.handleClick}>
      //   {this.props.children}{' '}</li>
    );
  }
}

DropDownItem.propTypes = {
  children: PropTypes.node.isRequired,
  onSelect: PropTypes.func,
  select: PropTypes.func,
};

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeItem: this.props.default_children_index ? this.props.children[this.props.default_children_index]
        : this.props.children[0] || this.props.children,
    };
  }

  componentWillMount() {
    document.addEventListener('click', this.onDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick, false);
  }

  onDocumentClick = (e) => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.closeDropdown();
    }
  }

  select = (item) => {
    this.setState({ activeItem: item });
    this.closeDropdown();
  }

  toggleDropdown = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  closeDropdown = () => {
    this.setState({ isOpen: false });
  }

  _addSelectHandler = (el) => {
    if (el) {
      return React.cloneElement(el, { select: this.select.bind(this, el) });
    }
  }

  render() {
    let { activeItem, isOpen } = this.state;
    let { children, className, fixedActiveItem, prefixItem } = this.props;
    let activeText;
    if (fixedActiveItem) {
      activeText = fixedActiveItem;
    } else {
      activeText = activeItem.props.children;
    }
    let dropdownChildren = React.Children.map(children, this._addSelectHandler);
    return (
      <div className={'dropdown-select ' + className}>
        <a className="dropdown-active" onClick={this.toggleDropdown}>
          {prefixItem}
          {activeText}
          {
            !this.props.hideDownArrow &&
            <i className="fa fa-sort-desc"></i>
          }
        </a>
        <ul className={isOpen ? ' open' : ' closed'}>
          {dropdownChildren}
        </ul>
      </div>
    );
  }
}

DropDown.propTypes = {
  children: PropTypes.node.isRequired,
  default_children_index: PropTypes.number,
  fixedActiveItem: PropTypes.object,
  prefixItem: PropTypes.object,
  className: PropTypes.string,
  hideDownArrow: PropTypes.bool
};

export { DropDown, DropDownItem };
