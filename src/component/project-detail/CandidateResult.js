import { Spin } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchCandidatesResult } from '../../service/action/ProjectAction';

class CandidateResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.props.fetchPositionRequire(this.props.requireID)
    }

    componentDidUpdate = (prevProp) => {
        if (prevProp.candidatesResult !== this.props.candidatesResult)
            this.setState({ isLoading: false })
    }

    showCandidatesStatus = (status) => {
        switch (status) {
            case 0:
                return 'Not Confirm'
            case 1:
                return 'Accepted'
            case 2:
                return 'Declined'
            default:
                break;
        }
    }

    showCandidates = () => {
        var result = null
        var { candidatesResult } = this.props
        result = candidatesResult.map((item, index) => {
            return (
                <tr key={index}>
                    <td className='text-center'>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td className='text-center'>{item.phoneNumber}</td>
                    <td className='text-center'>{this.showCandidatesStatus(item.status)}</td>
                    <td>{item.rejectReason}</td>
                </tr>
            )
        })
        return result
    }

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading ?
                    <div className='row justify-content-center'>
                        <Spin className='text-center' size="large" />
                    </div> :
                    this.props.candidatesResult.length === 0 ?
                        <div className='row justify-content-center' style={{ width: 'auto' }} >
                            <h4 style={{ fontStyle: 'italic', color: 'gray' }} >There is currently no candidates for this requirement</h4>
                        </div>
                        :
                        <>
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th width={50} className='text-center'>No</th>
                                            <th className='text-center' width={200}>Candidate Name</th>
                                            <th className='text-center' width={150}>Email</th>
                                            <th className='text-center' width={105}>Phone</th>
                                            <th className='text-center' width={100} >Status</th>
                                            <th className='text-center' width={200} >Rejecting Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showCandidates()}
                                    </tbody>
                                </table>
                            </div>
                        </>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        candidatesResult: state.CandidateResultReducer
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchPositionRequire: requireID => {
            dispatch(fetchCandidatesResult(requireID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(CandidateResult);