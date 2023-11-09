import React, { Component } from 'react';
import CandidateTable from './CandidateTable';
import './ConfirmPage.css'

class ConfirmSelectCandidate extends Component {

    showList = (candidateList) => {
        var result = null
        result = candidateList.map((item, index) => {
            return (<CandidateTable key={index} item={item} />)
        })
        return result
    }

    render() {
        var { candidateList } = this.props
        return (
            <div className='card mb-80'>
                <div className="card-body">
                    {candidateList.length === 0 ?
                        <h4 className="text-center" style={{ fontStyle: 'italic', color: 'gray' }}>No data</h4> :
                        this.showList(candidateList)}
                </div>
            </div>
        );
    }
}


export default ConfirmSelectCandidate;