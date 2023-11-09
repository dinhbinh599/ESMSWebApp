import { Tooltip } from 'antd';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SuggestCandidateItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disable: false
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.candidate !== this.props.candidate) {
            var { candidateSelectedList, position, candidate } = this.props
            this.setState({ disable: false })
            candidateSelectedList.forEach(element => {
                if (element.position !== position) {
                    element.candidateSelect.forEach(e => {
                        if (e.empID === candidate.empID) {
                            this.setState({ disable: true })
                        }
                    });
                }
            });
        }
    }

    onSelect = (event) => {
        this.props.onSelect(event.target.checked, this.props.candidate)
    }

    checkSelectCandidate = (empID) => {
        var { selectedItem } = this.props
        if (selectedItem !== null) {
            for (let index = 0; index < selectedItem.candidateSelect.length; index++) {
                if (selectedItem.candidateSelect[index].empID === empID) {
                    return true
                }
            }
        }
        return false
    }

    render() {
        var { index, candidate, candidateNeeds } = this.props
        return (
            <tr style={this.state.disable ? { backgroundColor: '#ff9999' } : index < candidateNeeds ? { backgroundColor: '#F0F0F0' } : { backgroundColor: 'white' }}>
                <th className="text-center">{index + 1}</th>
                <th className="">
                    <NavLink className='text-primary' to={`/project/suggest-candidate/emp/${candidate.empID}`}> {candidate.empName}</NavLink>
                </th>
                <th className="text-center">{candidate.languageMatch.toFixed(2)} / 10</th>
                <th className="text-center">{candidate.softSkillMatch.toFixed(2)} / 10</th>
                <th className="text-center">{candidate.hardSkillMatch.toFixed(2)} /10 </th>
                <th className="text-center">{candidate.overallMatch.toFixed(2)} / 50</th>
                <Tooltip placement='left' title={this.state.disable ? 'This employee has been selected for another position in the project' : ''}  >
                    <th className="text-center">
                        <input type="checkbox" onClick={this.onSelect} checked={this.checkSelectCandidate(candidate.empID)} disabled={this.state.disable} />
                    </th>
                </Tooltip >
            </tr>
        );
    }
}

export default SuggestCandidateItems;