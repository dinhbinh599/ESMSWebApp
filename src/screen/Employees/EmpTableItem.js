import React, { Component } from 'react';
import { history } from '../../service/helper/History';
import { getUserName, showRole } from '../../service/util/util';

class EmpTableItem extends Component {

    onHandle = () => {
        var { profile } = this.props
        var url = `/employee/profile/${profile.id}`
        history.push(url)
    }

    render() {
        var { index, profile } = this.props
        // if (profile.name !== getUserName()) {
            return (
                <tr>
                    <th className="text-center">{index + 1}</th>
                    <th className="">{profile.name}</th>
                    <th className="">{profile.phoneNumber}</th>
                    <th className="">{profile.email}</th>
                    <th className="">{profile.userName}</th>
                    <th className="">{showRole(profile.roleName)}</th>
                    <th className="text-primary">
                        <a onClick={this.onHandle} style={{ cursor: 'pointer' }}>
                            Detail
                        </a>
                    </th>
                </tr>
            );
        // }
    }
}

export default EmpTableItem;