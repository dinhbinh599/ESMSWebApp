import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from "../../service/action/ProjectAction";
import ProjectTableItem from "../../component/project-table-item/ProjectTableItem";
import { checkSession } from '../../service/action/AuthenticateAction';
import Search from '../../component/search/Search';
import { Pagination, Spin } from 'antd';



class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            search: '',
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        this.props.fetchProject(this.state.page, this.state.search)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.projects !== prevState.projects) {
            return { someState: nextProps.projects };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.projects !== this.props.projects) {
            if (typeof this.props.projects.items !== 'undefined') {
                this.setState({ isLoading: false })
            }
        }
    }

    onShowListProject = (projectList) => {
        var result = null
        if (typeof projectList !== 'undefined') {
            result = projectList.map((project, index) => {
                return (<ProjectTableItem key={index} project={project} index={index} />);
            })
        }
        return result
    }

    searchProject = (value) => {
        this.setState({ search: value })
        this.props.fetchProject(1, value)
    }

    onSelectPage = (e) => {
        this.props.fetchProject(e, this.state.search)
    }

    render() {
        var { projects } = this.props
        return (
            <React.Fragment>
                <ol class="breadcrumb mb-4 mt-3">
                    <li class="breadcrumb-item active">Projects</li>
                </ol>
                <div className="container-fluid">


                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table mr-1"></i>
                    Projects
                </div>
                        <div class="card-body">
                            {this.state.isLoading ? '' :
                                <div className="row mb-3">
                                    <Search search="project"
                                        placeholder="Search project name ..."
                                        searchProject={this.searchProject} />
                                </div>
                            }
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th width={40} className="font-weight-bold">No</th>
                                            <th width={200} className="font-weight-bold">Project Name</th>
                                            <th className="font-weight-bold">PM Name</th>
                                            <th className="font-weight-bold text-center">Created Date</th>
                                            <th className="font-weight-bold text-center">Start Date</th>
                                            <th className="font-weight-bold text-center">Estimated End Date</th>
                                            <th className="font-weight-bold text-center" style={{ width: 80 }}>Status</th>
                                            <th className="font-weight-bold"></th>
                                        </tr>
                                    </thead>
                                    {this.state.isLoading ? '' :
                                        <tbody>
                                            {this.onShowListProject(projects.items)}
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                        {this.state.isLoading ?
                            <div className='row justify-content-center'>
                                <Spin className='text-center' size="large" />
                            </div>
                            : ''}
                        {this.state.isLoading || projects.pageCount === 1 ? '' :
                            <div className='row justify-content-center' style={{ marginBottom: 20 }} >
                                <Pagination defaultCurrent={projects.pageIndex} total={projects.totalRecords} onChange={this.onSelectPage} />
                            </div>
                        }
                    </div>
                </div>


            </React.Fragment >
        );
    }
}

const mapStateToProp = state => {
    return {
        projects: state.ProjectFetchReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchProject: (pageIndex, search) => {
            dispatch(Action.fetchProject(pageIndex, search))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Project);