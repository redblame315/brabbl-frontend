import React, { Component } from 'react';
import Pagination from 'rc-pagination'
const localeInfo = {

}
class CPagination extends Component {

    render () {
        let prevIcon = <span className="pagination-prev-text">{'<'}</span>
        let nextIcon = <span className="pagination-next-text">{'>'}</span>
        const props = this.props;
        return <div className="brabbl-pagination-container" style={props.containerStyle}>
            <Pagination
                locale={localeInfo}

                {...props}
            />
        </div>
       
    }
}

export default CPagination