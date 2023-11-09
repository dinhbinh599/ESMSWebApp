import { Tooltip } from 'antd';
import React, { Component } from 'react';
import SuggestCandidateItems from './suggest-candidate-items/SuggestCandidateItems';

class SuggestCandidates extends Component {

    onSelect = (value, candidate) => {
        if (value) {
            this.props.onSelectCandidate(candidate, this.props.item)
        }
        else {
            this.props.onUnselectCandidate(candidate, this.props.item.posName)
        }
    }

    showCandidate = (candidateList, posID) => {
        var result = null
        result = candidateList.map((candidate, index) => {
            return (<SuggestCandidateItems key={index}
                onSelect={this.props.onSelectCandidate}
                candidate={candidate}
                index={index}
                posID={posID}
                onNoteRejectingReason={this.props.onNoteRejectingReason}
            />)
        })

        return result
    }

    onSelectAll = (event) => {
        var value = event.target.checked
        this.props.onSelectAll(value, this.props.item.posID)
    }

    render() {
        var { item } = this.props
        return (
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <div className="row">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className=" text-primary">
                                            <tr>
                                                <th className="font-weight-bold text-center">No</th>
                                                <th className="font-weight-bold">Name</th>
                                                <th className="font-weight-bold">Phone</th>
                                                <th className="font-weight-bold">Email</th>
                                                <th className="font-weight-bold text-center">Joined Projects</th>
                                                <Tooltip title='Check to apply all candidates' placement='right'>
                                                    <th className="font-weight-bold text-center">
                                                        <input type="checkbox" onClick={this.onSelectAll} checked={
                                                            typeof item === 'undefined' ? false :
                                                                typeof item.selectAll === 'undefined' ? false : item.selectAll} /> Get All
                                                    </th>
                                                </Tooltip>
                                                <th className="font-weight-bold text-center">
                                                    Rejecting Reason
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.showCandidate(typeof item === 'undefined' ? [] : item.employees, typeof item === 'undefined' ? [] : item.posID)}
                                        </tbody>
                                    </table>
                                </div>
                                {/* {item.employees.length === 0 ?
                                    <div className='row justify-content-center' style={{ width: 'auto' }} >
                                        <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
                                    </div>
                                    : ''} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}

export default SuggestCandidates;