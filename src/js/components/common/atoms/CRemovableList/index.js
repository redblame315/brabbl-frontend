import React, { Component } from 'react';
import PropTypes from 'prop-types'
import i18next from 'i18next';

class CRemovableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data || []
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data!==this.props.data){
          this.setState({data: this.props.data});
        }
    }

    onRemoveItem = (index) => {
        if (window.confirm(this.props.removeItemConfirmText 
            || i18next.t('Are you sure you wish to remove this item?')))  {
            if(this.props.onRemoveItem) {
                this.props.onRemoveItem(this.state.data[index])
            }
            if(this.props.autoRemove) {
                let data= [];
                this.state.data.map((item, i) => {
                    if(i != index) {
                        data.push(item);
                    }
                })
                this.setState({data: data});
                if(this.props.onChangeItem) {
                    this.props.onChangeItem(data);
                }
            }
        }

    }
    renderText = ( item ) => {
        if (this.props.renderCustomText) {
            return this.props.renderCustomText(item)
        } else {
            return item.name
        }
    }
    renderItem = (item, index) => {    
        return <div className="removable-item" key={'item'+index}>
            <a className="tooltip" onClick={() =>{this.onRemoveItem(index)}}>
                <span class="tooltiptext">{this.props.removeItemTooltipText || i18next.t('Remove item')}</span>
                <i style={{color: "#9E5354", marginRight: '8px', fontSize: '20px'}} className="fa fa-minus-circle"/>
            </a>
            {this.renderText(item)}
        </div>
    }
    render (){
        if(!this.state.data || this.state.data.length == 0) {
            return null
        }
        return <div className="removable-list" style={{marginTop: '16px'}}>
            {
                this.state.data.map((item, index) => {
                    return this.renderItem(item, index)
                })
            }
        </div>
    }



}

CRemovableList.propTypes = {
    data: PropTypes.array,
    removeItemTooltipText: PropTypes.string,
    removeItemConfirmText: PropTypes.string,
    onChangeItem: PropTypes.func,
    onRemoveItem: PropTypes.func,
    autoRemove: PropTypes.bool
}

export default CRemovableList