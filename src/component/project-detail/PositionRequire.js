import Modal from 'antd/lib/modal/Modal';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchPositionRequire } from '../../service/action/ProjectAction';
import PositionRequireDetail from './PositionRequireDetail';
import { showRequestStatus } from "../../service/util/util";
import { Spin } from 'antd';
import RequireModal from './RequireModal';

class PositionRequire extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            positionRequire: [],
            isLoad: true
        }
    }

    componentDidMount = () => {
        this.props.fetchPositionRequire(this.props.projectID)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.positionRequire !== this.props.positionRequire) {
            this.setState({ isLoad: false })
        }
    }

    showPosition = (list) => {
        var result = null
        result = list.map((value, index) => {
            return (
                <RequireModal key={index} index={index} value={value} />
            )
        })
        return result
    }

    render() {
        var { positionRequire } = this.props
        return (
            <React.Fragment>
                {this.state.isLoad ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div>
                    :
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th width={50} className='text-center'>No</th>
                                        <th width={160}>Position</th>
                                        <th width={160} className='text-center'>Candidates Needs</th>
                                        <th width={160} className='text-center'>Missing Employees</th>
                                        <th width={190} className='text-center'>Hard Skill Requirements</th>
                                        <th width={190} className='text-center'>Language Requirements</th>
                                        <th width={190} className='text-center'>Soft Skill Requirements</th>
                                        <th width={100} className='text-center'>Status</th>
                                        <th width={100}></th>
                                    </tr>
                                </thead>
                                {positionRequire.length > 0 ?
                                    <tbody>
                                        {this.showPosition(positionRequire)}
                                    </tbody>
                                    : ''}
                            </table>
                        </div>
                        {positionRequire.length > 0 ? '' :
                            <div className='row justify-content-center' style={{ width: 'auto' }} >
                                <h4 style={{ fontStyle: 'italic', color: 'gray' }} >There is currently no requirement</h4>
                            </div>
                        }
                    </div>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        positionRequire: state.PositionRequireReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchPositionRequire: projectID => {
            dispatch(fetchPositionRequire(projectID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(PositionRequire);