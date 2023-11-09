import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectDetailTable from '../../component/project-detail/ProjectDetailTable';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchProjectDetail } from '../../service/action/ProjectAction';
import { history } from '../../service/helper/History';
import ListEmployee from './ListEmployee';
import { Tabs } from 'antd';
import PositionRequire from "../../component/project-detail/PositionRequire";
import { showSpan, showStatus } from '../../service/util/util';
import moment from 'moment';

const TabPane = Tabs.TabPane;

class ProjectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 1,
            project: {}
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        var { match } = this.props
        this.props.fetchProjectDetail(match.params.id)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.project !== prevState.project) {
            return { someState: nextProps.project };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.project !== this.props.project) {
            this.setState({ project: this.props.project })
        }
    }

    onClickMenu = (value) => {
        this.setState({ select: parseInt(value) })
    }

    showDetail = (select) => {
        if (select === 1)
            return <ProjectDetailTable projectID={this.props.match.params.id} />
        if (select === 2)
            return <ListEmployee project={this.props.project} />
        if (select === 3)
            return <PositionRequire projectID={this.props.match.params.id} />
    }


    onBack = () => {
        history.push('/project')
    }

    render() {
        var { project, select } = this.state
        return (
            <React.Fragment>
                <div class="row breadcrumb mb-4 mt-3">
                    <div class="col-auto mr-auto">
                        <li class="breadcrumb-item active" style={{ fontWeight: 600 }}>{project.projectName}</li>
                    </div>
                    <div class="col-auto">
                        <p style={{ wordSpacing: 'normal' }} class="breadcrumb-item active" style={{fontWeight:600}}>
                            {moment(project.dateBegin).format('DD-MM-YYYY')} - {project.dateEnd === null ? moment(project.dateEstimatedEnd).format('DD-MM-YYYY') : moment(project.dateEnd).format('DD-MM-YYYY')}
                        </p>
                    </div>
                    <div class="col-auto">
                        <span className={`badge badge-pill ${showSpan(project.status)} span`}>
                            {showStatus(project.status)}
                        </span>
                    </div>
                </div>

                <div className='card mb-4'>
                    <div class="card-header">
                        <Tabs defaultActiveKey="1" onChange={this.onClickMenu}>
                            <TabPane tab="Project Detail" key={1}></TabPane>
                            <TabPane tab="Employee List" key={2}></TabPane>
                            <TabPane tab="Position Requirements" key={3}></TabPane>
                        </Tabs>
                    </div>
                    <div class="card-body">
                        {this.showDetail(select)}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProp = state => {
    return {
        project: state.ProjectDetailFetchReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchProjectDetail: (projectID) => {
            dispatch(fetchProjectDetail(projectID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(ProjectDetail);