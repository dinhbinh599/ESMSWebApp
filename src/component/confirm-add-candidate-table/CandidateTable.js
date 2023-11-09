import React, { Component } from 'react';

class CandidateTable extends Component {

    removeCandiate = (empID, postion) => {
        this.props.onDeleteCandiate(empID, postion)
    }

    showCandidate = (candidateList) => {
        var result = null
        result = candidateList.map((candidate, index) => {
            return (<tr key={index}>
                <th className="text-center">{index + 1}</th>
                <th className="">{candidate.empName}</th>
                <th className="text-center">{candidate.languageMatch.toFixed(2)} / 10</th>
                <th className="text-center">{candidate.softSkillMatch.toFixed(2)} / 10</th>
                <th className="text-center">{candidate.hardSkillMatch.toFixed(2)} /10 </th>
                <th className="text-center">{candidate.overallMatch.toFixed(2)} / 100</th>
                <th className="text-center">
                    <span class="material-icons" style={{ color: '#85C1E9', cursor: 'pointer' }} onClick={() => this.removeCandiate(candidate, this.props.position)} >delete</span>
                </th>
            </tr>)
        })
        return result
    }

    render() {
        var { item } = this.props;
        return (
            <React.Fragment>
                <div className='card mb-4'>
                    <div className='card-header'>
                        {item.position}
                    </div>
                    <div className='card-body'>
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th className="font-weight-bold text-center" width={40}>No</th>
                                        <th className="font-weight-bold" width={300}>Name</th>
                                        <th className="font-weight-bold text-center" width={200}>Match Language</th>
                                        <th className="font-weight-bold text-center" width={200}>Match Soft Skill</th>
                                        <th className="font-weight-bold text-center" width={200}>Match Hard Skill</th>
                                        <th className="font-weight-bold text-center" width={200}>Overall Match</th>
                                        <th className="font-weight-bold text-center" width={50}>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showCandidate(item.candidateSelect)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CandidateTable;