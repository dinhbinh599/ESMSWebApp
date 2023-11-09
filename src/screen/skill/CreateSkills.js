import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectBar from '../../component/create-position-form/select-search/SelectBar';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchProjectField } from '../../service/action/ProjectAction';
import { addHardSkillOption, createSkill, deleteHardSkillOption, fetchSkillDetail, generateSkill, selectPosition, selectProjectField, selectProjectType, updateSkill, updateSkillName, updateSkillType } from '../../service/action/SkillAction';
import { convertProjectTypeList } from '../../service/util/util';
import HardSkillOption from './HardSkillOption';

class CreateSkills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: [
                { label: 'Hard Skill', value: 0 },
                { label: 'Soft Skill', value: 1 }
            ],
            skillType: -1
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProjectField()
        var { match } = this.props
        if (typeof match !== 'undefined') {
            this.props.fetchSkillDetail(match.params.id)
        } else
            this.props.onGenerateSkill()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.skill !== prevState.skill) {
            return { someState: nextProps.skill };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.skill !== this.props.skill) {
            if (this.props.skill.skillType !== -1)
                this.setState({ skillType: this.props.skill.skillType })
        }
    }

    handleChange = (e) => {
        this.props.updateSkillName(e.target.value)
    }

    onSelect = (value) => {
        this.setState({ skillType: value })
        this.props.updateSkillType(value)
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (typeof this.props.match === 'undefined')
            this.props.createSkill(this.props.skill)
        else
            this.props.updateSkill(this.props.skill)
    }

    onAddHardSkillOption = () => {
        this.props.addHardSkillOption()
    }

    onDeleteHardSkillOption = (index) => {
        this.props.deleteHardSkillOption(index)
    }

    onSelectProjectType = (index, value) => {
        this.props.selectProjectType(index, value)
    }

    onSelectPosition = (index, value) => {
        this.props.selectPosition(index, value)
    }

    onSelectProjectField = (value) => {
        this.props.selectProjectField(value)
    }

    render() {
        var { skill, projectField } = this.props
        var projectFieldConverted = convertProjectTypeList(projectField)
        var result = null
        if (typeof skill !== 'undefined' || skill !== null)
            result = skill
        console.log(this.state.skillType === -1 || result.skillType === -1)

        return (
          <div
            className="card"
            style={{
              marginTop: "50px",
            }}
          >
            <div className="card-header card-header-primary">
              <h4 className="card-title">
                {typeof this.props.match !== "undefined"
                  ? "Update Skill"
                  : "Create Skill"}
              </h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col">
                    <fieldset className="form-group">
                      <label
                        className={`bmd-label-${
                          typeof this.props.match !== "undefined"
                            ? "static"
                            : "floating"
                        }`}
                      >
                        Skill
                      </label>
                      <input
                        type="text"
                        style={{ height: 34 }}
                        className="form-control"
                        name="skillName"
                        value={result.skillName}
                        onChange={this.handleChange}
                      />
                    </fieldset>
                  </div>

                  <div className="col">
                    <fieldset className="form-group">
                      <label className="bmd-label-floating">Skill Type</label>
                      <SelectBar
                        name="skillType"
                        type="special"
                        placeholder="Select skill type"
                        list={this.state.type}
                        onSelectSkillType={this.onSelect}
                        value={result.skillType}
                      />
                    </fieldset>
                  </div>
                </div>
                {this.state.skillType === -1 ? (
                  ""
                ) : this.state.skillType === 0 ? (
                  <HardSkillOption
                    hardSkill={result.hardSkillOption}
                    onAddHardSkillOption={this.onAddHardSkillOption}
                    onDeleteHardSkillOption={this.onDeleteHardSkillOption}
                    onSelectProjectType={this.onSelectProjectType}
                    onSelectPosition={this.onSelectPosition}
                  />
                ) : (
                  <div className="row">
                    <div className="col">
                      <fieldset className="form-group">
                        <label className="bmd-label-floating">
                          Project Field
                        </label>
                        <SelectBar
                          name="projectField"
                          type="multi"
                          list={projectFieldConverted}
                          value={result.softSkillOption}
                          onSelectProjectField={this.onSelectProjectField}
                        />
                      </fieldset>
                    </div>
                  </div>
                )}
                <button
                  className="btn btn-primary pull-right"
                  onClick={this.onSubmit}
                >
                  {typeof this.props.match !== "undefined"
                    ? "Update"
                    : "Create"}
                </button>
              </form>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        skill: state.SkillReducer,
        projectField: state.ProjectFieldReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGenerateSkill: () => {
            dispatch(generateSkill())
        },
        createSkill: (skill) => {
            dispatch(createSkill(skill))
        },
        updateSkillName: (skill) => {
            dispatch(updateSkillName(skill))
        },
        updateSkillType: (skillType) => {
            dispatch(updateSkillType(skillType))
        },
        addHardSkillOption: () => {
            dispatch(addHardSkillOption())
        },
        deleteHardSkillOption: (index) => {
            dispatch(deleteHardSkillOption(index))
        },
        selectProjectType: (index, projectType) => {
            dispatch(selectProjectType(index, projectType))
        },
        selectPosition: (index, position) => {
            dispatch(selectPosition(index, position))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        fetchSkillDetail: (skillID) => {
            dispatch(fetchSkillDetail(skillID))
        },
        updateSkill: (skill) => {
            dispatch(updateSkill(skill))
        },
        fetchProjectField: () => {
            dispatch(fetchProjectField())
        },
        selectProjectField: (value) => {
            dispatch(selectProjectField(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSkills);