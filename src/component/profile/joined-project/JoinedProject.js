import { Pagination, Spin } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchEmployeeJoinedProjects } from '../../../service/action/ProjectAction';
import ProjectTableItem from '../../project-table-item/ProjectTableItem';

class JoinedProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: true
        }
    }


    componentDidMount() {
        this.props.fetchJoinedList(this.props.empID, 1)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.joinedProject !== this.props.joinedProject) {
            this.setState({ isLoad: false })
        }
    }

    onShowListProject = (projectList) => {
        var result = null
        if (typeof projectList !== 'undefined') {
            result = projectList.map((project, index) => {
                return (
                    <tr key={index}>
                        <th className="text-center">{index + 1}</th>
                        <th className="">{project.projectName}</th>
                        <th className="text-center">{moment(project.dateIn).format('DD-MM-YYYY')}</th>
                        <th className="">{project.posName}</th>
                        <th className="text-center">
                            <NavLink to={`/project/detail/${project.projectID}`}>
                                Detail
                    </NavLink>
                        </th>
                    </tr>
                );
            })
        }
        return result
    }

    onSelectPage = (value) => {
        this.props.fetchJoinedList(this.props.empID, value)
    }

    render() {
        var { joinedProject } = this.props
        return (
            <React.Fragment>
                {this.state.isLoad ?
                    <div className="row justify-content-center">
                        <Spin className="text-center" size="large" />
                    </div>
                    :
                    joinedProject.items.length > 0 ?
                        <>
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead className=" text-primary">
                                        <tr>
                                            <th width={40} className="font-weight-bold">No</th>
                                            <th width={350} className="font-weight-bold">Project Name</th>
                                            <th width={150} className="font-weight-bold text-center">Joined Date</th>
                                            <th width={150} className="font-weight-bold text-center">Position</th>
                                            <th width={50} className="font-weight-bold"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.onShowListProject(joinedProject.items)}
                                    </tbody>
                                </table>
                            </div>
                            {joinedProject.pageCount <= 1 ? "" :
                                <div className='row justify-content-center' style={{ marginBottom: 20 }} >
                                    <Pagination defaultCurrent={joinedProject.pageIndex} total={joinedProject.totalRecords} onChange={this.onSelectPage} />
                                </div>
                            }
                        </>
                        :
                        <div className='row justify-content-center' style={{ width: 'auto' }} >
                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >This employee has not joined any project</h4>
                        </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        joinedProject: state.JoinedProjectReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchJoinedList: (empID, pageIndex) => {
            dispatch(fetchEmployeeJoinedProjects(empID, pageIndex))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(JoinedProject);