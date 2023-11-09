import moment from 'moment';
import React, { Component } from 'react';
import { history } from '../../service/helper/History';
import { showSpan, showStatus } from '../../service/util/util';
import { NavLink } from 'react-router-dom';
import { Badge, Tooltip } from 'antd';


class ProjectTableItem extends Component {

    onHandle = () => {
        var { project } = this.props
        var url = `/project/detail/${project.projectID}`
        var confirmUrl = `/project/confirm/${project.projectID}`
        if (project.status === 0 || project.isAddNewCandidate) {
            history.push(confirmUrl)
        } else {
            history.push(url)
        }
    }

    render() {
        var { index, project } = this.props
        return (
            <tr>
                <th className="text-center">{index + 1}</th>
                <th className="">
                    <Tooltip title={project.isMissEmp ? 'This project is currently missing employees' : ''} placement='right' >
                        <Badge dot={project.isMissEmp}>
                            {project.projectName}
                        </Badge>
                    </Tooltip>
                </th>
                <th className="">{project.name}</th>
                <th className="text-center">{moment(project.dateCreated).format("DD-MM-YYYY")}</th>
                <th className="text-center">{moment(project.dateBegin).format("DD-MM-YYYY")}</th>
                <th className="text-center">{moment(project.dateEstimatedEnd).format("DD-MM-YYYY")}</th>
                <th className="text-center" style={{ width: 50 }} >
                    <span className={`badge badge-pill ${showSpan(project.status)} span`}>
                        {showStatus(project.status)}
                    </span>
                </th>
                <th className="text-center">
                    <NavLink to={`/project/detail/${project.projectID}`}>
                        Detail
                    </NavLink>
                </th>
            </tr>
        );
    }
}


export default ProjectTableItem;