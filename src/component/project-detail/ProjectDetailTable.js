import { Badge, Button, Descriptions, Spin } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import * as Action from '../../service/action/ProjectAction'
import { showStatus, showBadge } from '../../service/util/util';
import { history } from '../../service/helper/History'
import { sendNotificate } from '../../service/action/FirebaseAction';

class ProjectDetailTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: true,
            project: {}
        }
    }

    componentDidMount = () => {
        this.props.fetchProjectDetail(this.props.projectID)
    }

    componentWillReceiveProps = () => {
        var { project } = this.props
        if (typeof project.projectID !== 'undefined')
            this.setState({ isLoad: false, project: project })
    }

    onDecline = () => {
        var { match, declineProject, project, sendNotificate } = this.props
        confirm({
            title: 'Are you sure decline this project?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                declineProject(match.params.id, project.projectName, project.pmID)
                // sendNotificate(project.pmID, `Project ${project.projectName} has been declined`)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    render() {
        var { project } = this.state
        return (
            <React.Fragment>
                {this.state.isLoad ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div>
                    :
                    <Descriptions title="Project Info" layout='horizontal' bordered extra={
                        project.status === 1 || project.status === 2 && project.noe === 0 || project.status === 0 ?
                            <Button onClick={this.onDecline} type="danger" >
                                Decline
                        </Button>
                            : ''}>

                        <Descriptions.Item span={3} label="Project Name">{project.projectName} </Descriptions.Item>

                        <Descriptions.Item span={3} label="Project Type">{project.typeName}</Descriptions.Item>

                        <Descriptions.Item span={3} label="Project Field">{project.fieldName}</Descriptions.Item>

                        <Descriptions.Item label="Start Date">{moment(project.dateBegin).format('DD-MM-YYYY')}</Descriptions.Item>

                        <Descriptions.Item label={project.dateEnd === null ? 'Estimated End Date' : 'Ended Date'} span={2}>

                            {project.dateEnd === null ? moment(project.dateEstimatedEnd).format('DD-MM-YYYY') : moment(project.dateEnd).format('DD-MM-YYYY')}
                        </Descriptions.Item>

                        <Descriptions.Item label="Status" span={3}>
                            <Badge status={showBadge(project.status)} text={showStatus(project.status)} />
                        </Descriptions.Item>


                        <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
                    </Descriptions>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        project: state.ProjectDetailFetchReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchProjectDetail: projectID => {
            dispatch(Action.fetchProjectDetail(projectID))
        },
        changeStatusToFinish: projectID => {
            dispatch(Action.changeStatusToFinish(projectID))
        },
        declineProject: (projectID, projectName, pmID) => {
            dispatch(Action.declineProject(projectID, projectName, pmID))
        },
        checkSession: () => {
            dispatch(checkSession())
        },
        sendNotificate: (pmID, body) => {
            dispatch(sendNotificate(pmID, body))
        }
    }
}

export default compose(withRouter, connect(mapStateToProp, mapDispatchToProp))(ProjectDetailTable);