import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSoftSkill } from '../../../service/action/SoftSkillSelectBarAction';
import { convertSkillList } from '../../../service/util/util';
import SelectBar from '../select-search/SelectBar';

class SoftSkillForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMinimize: false
        }
    }

    componentDidMount = () => {
        this.props.fetchSoftSkillList()
    }

    onAddSoftSkill = () => {
        this.props.onAddSoftSkill(0)
    }

    getSoftSkillListNotSelect = (softSkill) => {
        var { softSkillList } = this.props
        var listNotSelect = softSkillList.slice(0, softSkillList.length)
        if (typeof softSkill !== 'undefined') {
            for (let i = 0; i < listNotSelect.length; i++) {
                for (let k = 0; k < softSkill.length; k++) {
                    if (listNotSelect[i].skillID === softSkill[k]) {
                        var clone = { ...listNotSelect[i] }
                        clone.isSelect = true
                        listNotSelect[i] = clone
                    }
                }
            }
        }

        return listNotSelect
    }

    render() {
        var { softSkill } = this.props
        var result = []
        if (typeof softSkill !== 'undefined')
            result = softSkill
        var convertedList = convertSkillList(this.props.softSkillList)
        return (
            <div className="card mb-50">
                <div className="card-header ">
                    Soft Skill
                </div>
                <div className="card-body">
                    <SelectBar name="softSkillID"
                        type='multi'
                        placeholder="Select soft skill"
                        list={convertedList}
                        onUpdateSoftSkillID={this.props.onUpdateSoftSkillID}
                        value={result}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        softSkillList: state.SoftSkillSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchSoftSkillList: () => {
            dispatch(fetchSoftSkill())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(SoftSkillForm);