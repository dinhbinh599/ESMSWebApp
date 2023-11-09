import { Descriptions, Modal, notification, Spin } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { store } from 'react-notifications-component';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addMoreCandidate, getPrevRequire, suggestAgain } from '../../service/action/PositionAction';
import { history } from '../../service/helper/History';

class ListEmployeeContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLoading: false
        }
    }

    componentDidMount = () => {
        console.log('componentDidMount', this.props.projectID, this.props.positionSelect)
        this.props.getPrevRequire(this.props.projectID, this.props.item.posID)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.item !== this.props.item) {
            console.log('items', this.props.item)
            // if (typeof this.props.prevRequire !== 'undefined')
            this.setState({ isLoading: false })
        }
    }

    showCandidate = (employees, posName) => {
        var result = null
        result = employees.map((employee, index) => {
            return (
                <tr key={index}>
                    <th >
                        <NavLink className="text-primary" to={`/project/detail/emp/${employee.empID}`}>{employee.name}</NavLink>
                    </th>
                    <th className="">{posName}</th>
                    <th className="">{employee.email}</th>
                    <th className="">{employee.phoneNumber}</th>
                    <th className="text-center">
                        {employee.dateIn === null ? "-" : moment(employee.dateIn).format('DD-MM-YYYY')}
                    </th>
                </tr>

            )
        })
        return result
    }

    onSelectCandidatesAgain = () => {
        this.setState({ visible: true })
    }

    onAddMoreCandidates = () => {
        localStorage.setItem('projectId', this.props.projectID)
        localStorage.setItem('projectType', this.props.projectType)
        localStorage.setItem('projectField', this.props.projectField)
        localStorage.setItem('projectName', this.props.projectName)
        localStorage.setItem('positionRequire', this.props.prevRequire)
        this.props.addMoreCandidate(this.props.item.posID)
    }

    handleOk = () => {
        var { prevRequire } = this.props
        if (prevRequire.status === 2 || prevRequire.status === 0) {
            var obj = {
                requiredPosID: prevRequire.requiredPosID,
                posID: prevRequire.posID,
                candidateNeeded: prevRequire.missingEmployee,
                language: [],
                softSkillIDs: [],
                hardSkills: []
            }
            prevRequire.language.forEach(element => {
                var language = { langID: element.langID, priority: element.priority }
                obj.language.push(language)
            });
            prevRequire.softSkillIDs.forEach(element => {
                var hardSkill = { hardSkillID: element.langID, skillLevel: element.skillLevel, certificationLevel: element.certificationLevel, priority: element.priority }
                obj.hardSkills.push(hardSkill)
            });
            prevRequire.softSkillIDs.forEach(element => {
                obj.softSkillIDs.push(element.softSkillID)
            });
            var array = []
            array.push(obj)
            localStorage.setItem('projectId', this.props.projectID)
            localStorage.setItem('projectType', this.props.projectType)
            localStorage.setItem('projectField', this.props.projectField)
            localStorage.setItem('projectName', this.props.projectName)
            localStorage.setItem('positionRequire', JSON.stringify(array))
            this.props.suggestAgain()
        } else if (prevRequire.status === 1) {
            console.log('aaa')
            notification.open({
                message: 'Require is being confirm',
            });
        }
    }

    handleCancel = (e) => {
        this.setState({ visible: false });
    }

    showHardSkill = (skills) => {
        var result = null
        result = skills.map((value, index) => {
            return (<ul>
                <li>{value.hardSkillName}</li>
                <li>Skill Level: {value.skillLevel}</li>
                <li>
                    Certification Level: {value.certificationLevel === 0 ? 'All' : 'Level ' + value.certificationLevel}  <br />
                </li>
                <li>
                    Priority: {value.priority}
                </li>
            </ul>)
        })
        return result
    }

    showLanguage = (language) => {
        var result = null
        result = language.map((value, index) => {
            return (
                <>{value.langName} - Priority: {value.priority}</>
            )
        })
        return result
    }

    showSoftSkill = (softSkill) => {
        var result = null
        result = softSkill.map((value, index) => {
            return (<>{value.softSkillName} < br /></>
            )
        })
        return result
    }

    render() {
        var { item, prevRequire } = this.props
        return (
            <React.Fragment>
                {this.state.isLoading ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div> :
                    <>
                        <div className='row pull-right' style={{ width: 'auto' }} >
                            <h5 style={{ marginRight: 14 }} >{item.noe} / {item.candidateNeeded} Candidate Needs </h5>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <th className="font-weight-bold">Name</th>
                                    <th className="font-weight-bold">Position</th>
                                    <th className="font-weight-bold">Email</th>
                                    <th className="font-weight-bold">Phone</th>
                                    <th width={120} className="font-weight-bold text-center">Date In</th>
                                </thead>
                                <tbody>
                                    {this.showCandidate(item.employees, item.posName)}
                                </tbody>
                            </table>
                        </div>
                        {item.employees.length === 0 ?
                            <div className='row justify-content-center' style={{ width: 'auto' }} >
                                <h4 style={{ fontStyle: 'italic', color: 'gray' }} >No data</h4>
                            </div>
                            : ''
                        }
                        {this.props.projectStatus === 4 ? "" :
                            item.noe === item.candidateNeeded ?
                                <button type="submit" className="btn btn-primary pull-right" onClick={this.onAddMoreCandidates}  >
                                    Add More Candidates
                                </button>
                                :
                                typeof prevRequire.posName !== 'undefined' ?
                                    <>
                                        <button type="submit" className="btn btn-primary pull-right" onClick={this.onSelectCandidatesAgain}  >
                                            Select Candidates Again
                                        </button>
                                        <Modal title="Requirement" width={1000}
                                            visible={this.state.visible}
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel} >
                                            <Descriptions>
                                                <Descriptions.Item>{prevRequire.posName} </Descriptions.Item>
                                                <Descriptions.Item label='Candidate Needs'>{prevRequire.missingEmployee} </Descriptions.Item>
                                            </Descriptions>
                                            <Descriptions>
                                                <Descriptions.Item label='Hard Skill'>
                                                    {this.showHardSkill(prevRequire.hardSkills)}
                                                </Descriptions.Item>
                                            </Descriptions>
                                            <Descriptions>
                                                <Descriptions.Item label='Language'>
                                                    {this.showLanguage(prevRequire.language)}
                                                </Descriptions.Item>
                                            </Descriptions>
                                            <Descriptions>
                                                <Descriptions.Item label='Soft Skill'>
                                                    {this.showSoftSkill(prevRequire.softSkillIDs)}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Modal>
                                    </> :
                                    ''
                        }
                    </>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        prevRequire: state.PreviosRequrieReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        addMoreCandidate: (posID) => {
            dispatch(addMoreCandidate(posID))
        },
        getPrevRequire: (projectID, posID) => {
            dispatch(getPrevRequire(projectID, posID))
        },
        suggestAgain: () => {
            dispatch(suggestAgain())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ListEmployeeContent);