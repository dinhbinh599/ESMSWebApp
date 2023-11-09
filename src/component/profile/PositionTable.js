import { Button, Descriptions, Spin } from "antd";
import moment from "moment";
import React, { Component } from 'react';
import { showHardSkillLevel } from "../../service/util/util";
import { checkSession } from "../../service/action/AuthenticateAction";
import { fetchPositionProfileDetail } from "../../service/action/ProfileAction";
import { connect } from "react-redux";
import { history } from "../../service/helper/History";

class SkillProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: true
        }
    }

    componentDidMount = () => {
        this.props.checkSession();
        this.props.fetchPositionProfileDetai(this.props.empID);
    };

    componentDidUpdate = (prevProp) => {
        if (prevProp.positionDetail !== this.props.positionDetail) {
            this.setState({ isLoad: false })
        }
    }

    onShowHardSkill = (hardSkills) => {
        var result = null;
        if (typeof hardSkills !== "undefined") {
            result = (hardSkills || []).map((skill, index) => {
                return (
                    <>
                        <Descriptions.Item style={{ backgroundColor: '#E8E8E8' }} span={3} label={skill.skillName}>
                            {showHardSkillLevel(skill.skillLevel)}
                        </Descriptions.Item>
                        {skill.certifications?.map((certification, innerIndex) => {
                            return (
                                <>
                                    <Descriptions.Item label={`+ ${certification.certiName}`} />
                                    <Descriptions.Item label="Taken Date">
                                        {certification?.dateTaken
                                            ? moment(certification.dateTaken).format("DD-MM-YYYY")
                                            : ""}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Expire Date">
                                        {certification?.dateEnd
                                            ? moment(certification.dateEnd).format("DD-MM-YYYY")
                                            : ""}
                                    </Descriptions.Item>
                                </>
                            );
                        })
                        }
                    </>
                );
            });
        }
        return result;
    };

    onShowSoftSkill = (softSkills) => {
        var result = null;
        if (typeof softSkills !== "undefined") {
            result = (softSkills || []).map((skill, index) => {
                return (
                    <>
                        <Descriptions.Item span={0}>{skill.skillName}</Descriptions.Item>
                    </>
                );
            });
        }
        return result;
    };

    onShowLanguage = (languages) => {
        var result = null;
        if (typeof languages !== "undefined") {
            result = (languages || []).map((language, index) => {
                return (
                    <>
                        <Descriptions.Item span={3} label={language.langName}>
                            Level {language.langLevel}
                        </Descriptions.Item>
                    </>
                );
            });
        }
        return result;
    };

    onEdit = () => {
        history.push(`/employee/update-position/${this.props.empID}`, { role: this.props.role })
    }

    render() {
        var { positionDetail } = this.props;
        return (
            <React.Fragment>
                {this.state.isLoad ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div>
                    :
                    <>
                        <Descriptions title="Hard Skill Info" layout="horizontal" bordered extra={<Button type="primary" onClick={this.onEdit}>Edit</Button>}                >
                            {this.onShowHardSkill((positionDetail || {}).hardSkills)}
                        </Descriptions>

                        <Descriptions title="Language Info" layout="horizontal" bordered >
                            {this.onShowLanguage((positionDetail || {}).languages)}
                        </Descriptions>

                        <Descriptions title="Soft Skill Info" layout="horizontal" bordered >
                            {this.onShowSoftSkill((positionDetail || {}).softSkills)}
                        </Descriptions>
                    </>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        positionDetail: state.PositionReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPositionProfileDetai: (empID) => {
            dispatch(fetchPositionProfileDetail(empID));
        },
        checkSession: () => {
            dispatch(checkSession());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillProfile);