import { Descriptions, Modal, notification } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPrevRequire } from '../../service/action/PositionAction';
import { history } from '../../service/helper/History';

class ListEmployeeContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount = () => {
        if (typeof this.props.item.posID !== 'undefined') {
            if (typeof this.props.item.posID === 'number')
                this.props.getPrevRequire(this.props.project.projectID, this.props.item.posID)
        }
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.item !== this.props.item) {
            this.props.getPrevRequire(this.props.project.projectID, this.props.item.posID)
        }
    }

    showCandidate = (employees, posName) => {
        var result = null
        result = employees.map((employee, index) => {
            return (<tr key={index}>
                <th >
                    <NavLink className="text-primary" to={`/employee/profile/${employee.empID}`}>{employee.name}</NavLink>
                </th>
                <th className="">{posName}</th>
                <th className="">{employee.phoneNumber}</th>
                <th className="">{employee.email}</th>
                <th className="text-center">
                    {employee.dateIn === null ? "-" : moment(employee.dateIn).format('DD-MM-YYYY')}
                </th>
            </tr>)
        })
        return result
    }

    onClickAddEmployees = () => {
        this.setState({ visible: true })
    }

    handleOk = () => {
        var { prevRequire } = this.props
        if (prevRequire.status === 2 | prevRequire.status === 0) {
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
            prevRequire.hardSkills.forEach(element => {
                var hardSkill = { hardSkillID: element.hardSkillID, skillLevel: element.skillLevel, certificationLevel: element.certificationLevel, priority: element.priority }
                obj.hardSkills.push(hardSkill)
            });
            prevRequire.softSkillIDs.forEach(element => {
                obj.softSkillIDs.push(element.softSkillID)
            });
            var array = []
            array.push(obj)
            localStorage.setItem('projectId', JSON.stringify(this.props.project.projectID))
            localStorage.setItem('pmID', JSON.stringify(this.props.project.pmID))
            localStorage.setItem('projectType', JSON.stringify(this.props.project.typeID))
            localStorage.setItem('projectField', JSON.stringify(this.props.project.fieldID))
            localStorage.setItem('projectName', JSON.stringify(this.props.project.projectName))
            localStorage.setItem('positionRequire', JSON.stringify(array))
            localStorage.setItem('dateCreate', this.props.project.dateBegin)
            localStorage.setItem('dateEnd', this.props.project.dateEstimatedEnd)
            history.push(`/project/add-employees/${this.props.project.projectID}`, { type: 'AddEmployee' })
        } else if (prevRequire.status === 1) {
            notification.open({
                message: 'Require is waiting to confirm',
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
        var temp = {}
        if (typeof prevRequire.requiredPosID !== 'undefined') {
            temp = prevRequire
        }
        return (
            <React.Fragment>
                <div className='row pull-right' style={{ width: 'auto' }} >
                    <h5 style={{ marginRight: 14 }} >{item.noe} / {item.candidateNeeded} Employees </h5>
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
                {/* {console.log(item.noe !== item.candidateNeeded, temp.status)} */}
                {/* {console.log('item', temp.status, item.noe !== item.candidateNeeded && (temp.status === 2 || temp.status === 0))} */}
                {typeof prevRequire.requiredPosID !== 'undefined' ?
                    item.noe !== item.candidateNeeded && (temp.status === 2 || temp.status === 0) ?
                        <>
                            <button type="submit" className="btn btn-primary pull-right" onClick={this.onHandle} style={{ fontWeight: 700 }} onClick={this.onClickAddEmployees} >
                                Add Employees
                        </button>
                            <Modal title="Requirement" width={1000}
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel} >
                                <Descriptions>
                                    <Descriptions.Item>{prevRequire.posName} </Descriptions.Item>
                                    <Descriptions.Item label='Candidate Needed'>{prevRequire.missingEmployee} </Descriptions.Item>
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
                        </> : '' : ''}
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
        getPrevRequire: (projectID, posID) => {
            dispatch(getPrevRequire(projectID, posID))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(ListEmployeeContent);