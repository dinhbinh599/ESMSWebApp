import { Descriptions } from 'antd';
import React, { Component } from 'react';

class PositionRequireDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hardSkillMinimize: false,
            languageMinimize: false,
            softSkillMinimize: false,
        }
    }

    setHardSkillMinimize = () => {
        this.setState({ hardSkillMinimize: !this.state.hardSkillMinimize })
    }

    setLanguageMinimize = () => {
        this.setState({ languageMinimize: !this.state.languageMinimize })
    }

    setSoftSkillMinimize = () => {
        this.setState({ softSkillMinimize: !this.state.softSkillMinimize })
    }

    showHardSkills = (list) => {
        var result = null
        result = list.map((value, index) => {
            return (
                <tr key={index} >
                    <td>{index + 1}</td>
                    <td>{value.hardSkillName}</td>
                    <td>{value.skillLevel}</td>
                    <td>{value.certificationLevel}</td>
                    <td>{value.priority}</td>
                </tr>
            )
        })
        return result
    }

    showLanguage = (list) => {
        var result = null
        result = list.map((value, index) => {
            return (
                <tr key={index} >
                    <td>{index + 1}</td>
                    <td>{value.langName}</td>
                    <td>{value.priority}</td>
                </tr>
            )
        })
        return result
    }

    showSoftSkills = (list) => {
        var result = null
        result = list.map((value, index) => {
            return (
                <Descriptions.Item key={index} >
                    + {value.softSkillName}
                </Descriptions.Item>

            )
        })
        return result
    }

    render() {
        var { hardSkills, language, softSkills } = this.props
        return (
            <React.Fragment>
                {/* Hard Skill */}
                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table mr-1"></i>Hard Skills
                    <span className="material-icons pull-right clear" style={{ cursor: 'pointer' }} onClick={this.setHardSkillMinimize} >
                            {!this.state.hardSkillMinimize ? 'minimize' : 'crop_free'}
                        </span>
                    </div>
                    {this.state.hardSkillMinimize ? '' :
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th width={50}>No</th>
                                            <th width={200}>Hard Skill</th>
                                            <th width={200}>Skill Level</th>
                                            <th width={200}>Certification Level</th>
                                            <th width={200}>Priority</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showHardSkills(hardSkills)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>

                {/* Language */}
                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table mr-1"></i>Language
                    <span className="material-icons pull-right clear" style={{ cursor: 'pointer' }} onClick={this.setLanguageMinimize} >
                            {!this.state.languageMinimize ? 'minimize' : 'crop_free'}
                        </span>
                    </div>
                    {this.state.languageMinimize ? '' :
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th width={50}>No</th>
                                            <th width={200}>Language</th>
                                            <th width={200}>Priority</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showLanguage(language)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>

                {/* Soft Skill */}
                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table mr-1"></i>Soft Skill
                        <span className="material-icons pull-right clear" style={{ cursor: 'pointer' }} onClick={this.setSoftSkillMinimize} >
                            {!this.state.softSkillMinimize ? 'minimize' : 'crop_free'}
                        </span>
                    </div>
                    {!this.state.softSkillMinimize ?
                        <div class="card-body">
                            <ul>
                                <Descriptions>
                                    {this.showSoftSkills(softSkills)}
                                </Descriptions>
                            </ul>
                        </div>
                        : ''}
                </div>
            </React.Fragment>
        );
    }
}

export default PositionRequireDetail;
