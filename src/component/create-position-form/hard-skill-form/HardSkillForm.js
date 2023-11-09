import React, { Component } from 'react';
import { connect } from 'react-redux';
import HardSkillFormContent from './hard-skill-form-content/HardSkillFormContent';
import { fetchHardSkill } from "../../../service/action/HardSkillSelectBarAction";

class HardSkillForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hardSkills: {
                skillID: 0,
                skillLevel: 0,
                empCertifications: [],
                certiList: []
            },
            isMinimize: false
        }
    }

    componentDidMount = () => {
        this.props.fetchHardSkillList()
    }

    onAddHardSkill = () => {
        this.props.onAddHardSkill(this.state.hardSkills)
    }

    getHardSkillListNotSelect = () => {
        var { hardSkillList, hardSkill } = this.props
        var listNotSelect = hardSkillList.slice(0, hardSkillList.length)
        if (typeof hardSkill !== 'undefined') {
            for (let i = 0; i < listNotSelect.length; i++) {
                for (let k = 0; k < hardSkill.length; k++) {
                    if (listNotSelect[i].skillID === hardSkill[k].skillID) {
                        var clone = { ...listNotSelect[i] }
                        clone.isSelect = true
                        listNotSelect[i] = clone
                    }
                }
            }
        }

        return listNotSelect
    }

    showItems = (hardSkill) => {
        var result = null;
        var hardSkillList = this.getHardSkillListNotSelect()
        if (typeof hardSkill !== 'undefined') {
            result = hardSkill.map((hardSkillDetail, hardSkillIndex) => {
                return (
                    <HardSkillFormContent key={hardSkillIndex}
                        hardSkillDetail={hardSkillDetail}
                        hardSkillIndex={hardSkillIndex}
                        hardSkillList={hardSkillList}
                        onDeleteHardSkill={this.props.onDeleteHardSkill}
                        onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                        onUpdateHardSkillLevel={this.props.onUpdateHardSkillLevel}
                        //Certificate
                        onAddCertificate={this.props.onAddCertificate}
                        onDeleteCertificate={this.props.onDeleteCertificate}
                        onUpdateCertficateID={this.props.onUpdateCertficateID}
                        onUpdateCertificateDate={this.props.onUpdateCertificateDate}
                    />
                );
            })
        }
        return result;
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    render() {
        var { hardSkill } = this.props
        var result = []
        if (typeof hardSkill !== 'undefined')
            result = hardSkill
        const showHardSkill = (hardSkill) => {
            if (this.state.isMinimize)
                return ""
            else
                return (<>
                    {this.showItems(hardSkill)}
                    {this.props.hardSkillList.length === hardSkill.length ?
                        '' :
                        <span className="material-icons add" style={{ marginTop: 10 }}
                            onClick={this.onAddHardSkill}>add_box</span>
                    }
                </>)
        }

        return (
            <div class="card mb-4">
                <div class="card-header">
                    Hard Skills
                    <span className="material-icons pull-right clear" style={{ cursor: 'pointer' }} onClick={this.setMinimize} >
                        {!this.state.isMinimize ? 'minimize' : 'crop_free'}
                    </span>
                </div>
                {!this.state.isMinimize ?
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th >Hard Skill</th>
                                        <th >Skill Level</th>
                                        <th className="text-center">Certificate</th>
                                        <th ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showHardSkill(result)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        hardSkillList: state.HardSkillSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchHardSkillList: () => {
            dispatch(fetchHardSkill())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(HardSkillForm);