import { Tooltip } from 'antd';
import React, { Component } from 'react';

class SuggestCandidateItems extends Component {

    onSelect = (event) => {
        var check = event.target.checked
        this.props.onSelect(check, this.props.candidate, this.props.posID)
    }

    onHandle = (e) => {
        this.props.onNoteRejectingReason(e.target.value, this.props.candidate, this.props.posID)
    }

    render() {
        var { index, candidate } = this.props
        console.log('candidate', typeof candidate.check === 'undefined' || !candidate.check)
        return (
            <tr>
                <th className="text-center">{index + 1}</th>
                <th className="">{candidate.name}</th>
                <th className="">{candidate.phoneNumber}</th>
                <th className="">{candidate.email}</th>
                <th className="text-center">{candidate.numberOfProject}</th>
                <th className="text-center">
                    <Tooltip title='Check to apply this candidate' placement='right'>
                        <input type="checkbox" onClick={this.onSelect} checked={typeof candidate.check === 'undefined' ? false : candidate.check} />
                    </Tooltip>
                </th>
                <th className="text-center">
                    <div className="form-group" style={{ marginBottom: '0 !important' }}>
                        <input type="input" className="form-control"
                            value={(typeof candidate.check === 'undefined' || !candidate.check) ?
                                (typeof candidate.note === 'undefined' ? '' : candidate.note) : ''}
                            readOnly={typeof candidate.check === 'undefined' ? false : candidate.check} style={{ height: 30 }} placeholder="Rejecting Reason"
                            onChange={this.onHandle} />
                    </div>
                </th>
            </tr>
        );
    }
}

export default SuggestCandidateItems;