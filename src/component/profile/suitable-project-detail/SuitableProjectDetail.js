import confirm from 'antd/lib/modal/confirm';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmSuggestList } from '../../../service/action/AddSuitableCandidateAction';

class SuitableProjectDetail extends Component {

    addEmployee = (posID, requireID, empID, projectID, projectName, pmID) => {
        var { addEmployee } = this.props
        confirm({
            title: `Add this employee to this position in the project.`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                var resutl = {
                    candidates: [
                        {
                            requiredPosID: requireID,
                            posID: posID,
                            empIDs: [
                                { empID: empID, isAccept: true, note: "" }
                            ]
                        }
                    ]
                }
                addEmployee(resutl, projectID, projectName, pmID, empID)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    showContent = () => {
        var { item } = this.props
        var result = null
        result = item.requiredPositions.map((detail, index) => {
            if (detail.matchDetail !== null)
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{detail.posName}</td>
                        <td className='text-center'>{detail.candidateNeeded - detail.missingEmployee} / {detail.candidateNeeded}</td>
                        <td className='text-center'>{detail.matchDetail.languageMatch} / 10</td>
                        <td className='text-center'>{detail.matchDetail.softSkillMatch} / 10</td>
                        <td className='text-center'>{detail.matchDetail.hardSkillMatch} / 10</td>
                        <td className='text-center'>{detail.matchDetail.overallMatch} / 50</td>
                        <td className='text-center text-primary'>
                            <a onClick={() =>
                                this.addEmployee(detail.posID, detail.requiredPosID, detail.matchDetail.empID,
                                    item.projectID, item.projectName, item.projectManagerID
                                )}>Add</a>
                        </td>
                    </tr>
                )
        })
        return result
    }

    render() {
        var { item } = this.props
        console.log(item)
        return (
            <React.Fragment>
                {
                    item.requiredPositions.length > 0 ?
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th className="font-weight-bold text-center" width={40}>No</th>
                                        <th className="font-weight-bold text-center" width={200}>Position</th>
                                        <th className="font-weight-bold text-center" width={130}>Employees</th>
                                        <th className="font-weight-bold text-center" width={140}>Match Language</th>
                                        <th className="font-weight-bold text-center" width={140}>Match Soft Skill</th>
                                        <th className="font-weight-bold text-center" width={140}>Match Hard Skill</th>
                                        <th className="font-weight-bold text-center" width={140}>Overall Match</th>
                                        <th className="font-weight-bold text-center" width={50}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.showContent()}
                                </tbody>
                            </table>
                        </div>
                        :
                        <h4 style={{ fontStyle: 'italic', color: 'gray' }} >There is no suitable position for this employee</h4>
                }
            </React.Fragment>
        );
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        addEmployee: (item, projectID, projectName, pmID, empID) => {
            dispatch(confirmSuggestList(item, projectID, projectName, pmID, empID))
        }
    }
}


export default connect(null, mapDispatchToProp)(SuitableProjectDetail);