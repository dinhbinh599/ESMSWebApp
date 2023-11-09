import React, { Component } from 'react';

class TableItems extends Component {
    render() {
        var { staff, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{staff.id}</td>
                <td>{staff.name}</td>
                <td>{staff.position}</td>
                <td>{staff.dateIn}</td>
                <td>{staff.dateOut}</td>
            </tr>
        );
    }
}

export default TableItems;