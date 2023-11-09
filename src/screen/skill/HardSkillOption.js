import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import { fetchPostionList } from '../../service/action/PositionAction';
import { fetchProjectType } from '../../service/action/ProjectAction';
import { convertPositionList, convertProjectTypeList } from '../../service/util/util';

class HardSkillOption extends Component {

    componentDidMount = () => {
        this.props.fetchPosition()
        this.props.fetchProjectType()
    }

    getProjectTypeNotSelect = () => {
        var { projectType, hardSkill } = this.props
        var listNotSelect = projectType.slice(0, projectType.length)
        for (let i = 0; i < listNotSelect.length; i++) {
            for (let k = 0; k < hardSkill.length; k++) {
                if (listNotSelect[i].id === hardSkill[k].projectType) {
                    var clone = { ...listNotSelect[i] }
                    clone.isSelect = true
                    listNotSelect[i] = clone
                }
            }
        }
        return listNotSelect
    }

    onDeleteHardSkillOption = (index) => {
        this.props.onDeleteHardSkillOption(index)
    }

    showHardSkillOption = (list, positionConverted, projectTypeConverted) => {
        var result = null
        result = list.map((value, index) => {
            return (
                <div className='row'>
                    <div className="col">
                        <fieldset className="form-group">
                            <label className="bmd-label-floating">Project Type</label>
                            <SelectBar name='projectType'
                                type='unique'
                                placeholder='Select project type'
                                list={projectTypeConverted}
                                value={value.projectType}
                                hardSkillOptionIndex={index}
                                onSelectProjectType={this.props.onSelectProjectType}
                            />
                        </fieldset>
                    </div>

                    <div className="col">
                        <fieldset className="form-group">
                            <label className="bmd-label-floating">Position</label>
                            <SelectBar name='position'
                                type='multi'
                                placeholder='Select position'
                                list={positionConverted}
                                value={value.position}
                                hardSkillOptionIndex={index}
                                onSelectPosition={this.props.onSelectPosition}
                            />
                        </fieldset>
                    </div>
                    <div className="col">
                        <span className="material-icons"
                            style={{ marginTop: 30, paddingLeft: 10, cursor: 'pointer' }}
                            onClick={() => this.onDeleteHardSkillOption(index)}>clear</span>
                    </div>
                </div>
            )
        })
        return result
    }

    onAddHardSkillOption = () => {
        this.props.onAddHardSkillOption()
    }

    render() {
        var { positionList, hardSkill, projectType } = this.props
        var positionConverted = convertPositionList(positionList)
        var projectTypeConverted = convertProjectTypeList(this.getProjectTypeNotSelect())
        console.log('a', hardSkill)
        return (
            <React.Fragment>
                {this.showHardSkillOption(hardSkill, positionConverted, projectTypeConverted)}
                {projectType.length === hardSkill.length ? '' :
                    <span className="material-icons add" style={{ marginTop: 10, cursor: 'pointer' }}
                        onClick={this.onAddHardSkillOption}>add_box</span>
                }
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        positionList: state.PositionSelectBarReducer,
        projectType: state.ProjectTypeReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosition: () => {
            dispatch(fetchPostionList())
        },
        fetchProjectType: () => {
            dispatch(fetchProjectType())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HardSkillOption);