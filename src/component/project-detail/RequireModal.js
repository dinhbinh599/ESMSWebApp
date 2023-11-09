import { Modal, Tabs } from 'antd';
import React, { Component } from 'react';
import { showRequestStatus } from '../../service/util/util';
import PositionRequireDetail from './PositionRequireDetail';
import CandidateResult from "./CandidateResult";
const TabPane = Tabs.TabPane;

class RequireModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    onShowRequireDetail = () => {
        this.setState({ visible: true })
    }

    render() {
        var { index, value } = this.props
        return (
            <tr>
                <td className='text-center'>{index + 1} </td>
                <td>{value.posName}</td>
                <td className='text-center'>{value.candidateNeeded}</td>
                <td className='text-center'>{value.missingEmployee}</td>
                <td className='text-center'>{value.hardSkills.length}</td>
                <td className='text-center'>{value.language.length}</td>
                <td className='text-center'>{value.softSkillIDs.length}</td>
                <td className='text-center'>{showRequestStatus(value.status)}</td>
                <td className='text-center'>
                    <a style={{ color: 'blue' }} onClick={this.onShowRequireDetail} >Detail</a>
                    <Modal width={1050} title={value.posName} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                        <Tabs defaultActiveKey={1} >
                            <TabPane key={1} tab="Details">
                                <PositionRequireDetail hardSkills={value.hardSkills} language={value.language} softSkills={value.softSkillIDs} />
                            </TabPane>
                            <TabPane key={2} tab="Candidates">
                                <CandidateResult requireID={value.requiredPosID} />
                            </TabPane>
                        </Tabs>
                    </Modal>
                </td>
            </tr>
        );
    }
}

export default RequireModal;