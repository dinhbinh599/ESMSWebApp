import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PositionTable from '../../component/profile/PositionTable';
import ProfileTable from '../../component/profile/ProfileTable';
import { checkSession } from '../../service/action/AuthenticateAction';
import { fetchProfileDetail } from '../../service/action/ProfileAction';
import { Tabs } from 'antd';
import SuitableProject from '../../component/profile/SuitableProject';
import JoinedProject from '../../component/profile/joined-project/JoinedProject';
const TabPane = Tabs.TabPane;

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 1
        }
    }

    componentDidMount = () => {
        this.props.checkSession()
        if (typeof this.props.match !== 'undefined')
            this.props.fetchProfileDetails(this.props.match.params.id)
    }

    onClickMenu = (value) => {
        this.setState({ select: parseInt(value) })
    }

    showDetail = (select) => {
        var { profile } = this.props
        var empID = ''
        if (typeof this.props.empID !== 'undefined')
            empID = this.props.empID
        else
            empID = this.props.match.params.id

        if (select === 1)
            return <ProfileTable empID={empID} />
        if (select === 2)
            return <PositionTable empID={empID} role={profile.roleName} />
        if (select === 3)
            return <SuitableProject empID={empID} />
        if (select === 4)
            return <JoinedProject empID={empID} />
    }


    render() {
        var { select } = this.state
        var { profile } = this.props
        return (
            <React.Fragment>
                <div className="row breadcrumb mb-4 mt-3">
                    <div className='col'>
                        <li className="breadcrumb-item active" style={{fontWeight:600}}>{profile.name}</li>
                    </div>
                    <div className='col'>
                        <li className="breadcrumb-item active" style={{fontWeight:600}}>Phone: {profile.phoneNumber}</li>
                    </div>
                    <div className='col'>
                        <li className="breadcrumb-item active" style={{fontWeight:600}}>Email: {profile.email}</li>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-header">
                        <Tabs defaultActiveKey="1" onChange={this.onClickMenu}>
                            <TabPane tab="Personal Infomation" key={1}></TabPane>
                            <TabPane tab="Skill Details" key={2}></TabPane>
                            {
                                typeof this.props.match !== 'undefined' ?
                                    <>
                                        <TabPane tab="Suitable Projects" key={3}></TabPane>
                                        <TabPane tab="Joined Projects" key={4}></TabPane>
                                    </>
                                    : ''
                            }
                        </Tabs>
                    </div>
                    <div className="card-body">
                        {this.showDetail(select)}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProp = state => {
    return {
        profile: state.ProfileFetchReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchProfileDetails: (empID) => {
            dispatch(fetchProfileDetail(empID))
        },
        checkSession: () => {
            dispatch(checkSession())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Profile);