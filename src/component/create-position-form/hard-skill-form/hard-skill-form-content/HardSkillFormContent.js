import { Modal } from 'antd';
import React, { Component } from 'react';
import { store } from 'react-notifications-component';
import { convertSkillList } from '../../../../service/util/util';
import CertificateForm from '../../certificate-form/CertificateForm';
import SelectBar from "../../select-search/SelectBar";

class HardSkillFormContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skillLevel: [
                { label: 'Basic Knowledge', value: 1 },
                { label: 'Limited Experience', value: 2 },
                { label: 'Practical', value: 3 },
                { label: 'Applied Theory', value: 4 },
                { label: 'Recognized Authority', value: 5 },
            ],
            visible: false
        }
    }

    onDeleteHardSkill = (hardSkillIndex) => {
        this.props.onDeleteHardSkill(hardSkillIndex)
    }

    onShowCertificate = () => {
        if (this.props.hardSkillDetail.skillID !== 0)
            this.setState({ visible: true })
        else
            store.addNotification({
                message: "Please select position",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 6000,
                    onScreen: false
                }
            })
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

    getHardSkillName = (hardSkillList, hardSkillId) => {
        var name = ''
        hardSkillList.forEach(element => {
            if (element.value === hardSkillId)
                name = element.label
        });
        return name
    }

    render() {
        var { hardSkillIndex, hardSkillList, hardSkillDetail } = this.props
        var listConverted = convertSkillList(hardSkillList)
        return (
            <React.Fragment>
                <tr>
                    <td>
                        <SelectBar name="hardSkill"
                            type='unique'
                            placeholder="Select hard skill"
                            hardSkillIndex={hardSkillIndex}
                            list={listConverted}
                            value={hardSkillDetail.skillID}
                            onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                        />
                    </td>
                    <td>
                        <SelectBar name="skillLevel"
                            type='common'
                            placeholder="Select hard skill level"
                            hardSkillIndex={hardSkillIndex}
                            list={this.state.skillLevel}
                            value={hardSkillDetail.skillLevel}
                            onUpdateHardSkillLevel={this.props.onUpdateHardSkillLevel}
                        />
                    </td>
                    <td className="text-center" >
                        <a style={{ color: 'blue' }} onClick={this.onShowCertificate} >Details</a>
                        <Modal width={1070} title={this.getHardSkillName(listConverted, hardSkillDetail.skillID)}
                            visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                            <CertificateForm
                                certificate={hardSkillDetail.empCertifications}
                                certiList={hardSkillDetail.certiList}
                                hardSkillID={hardSkillDetail.skillID}
                                hardSkillIndex={hardSkillIndex}
                                onAddCertificate={this.props.onAddCertificate}
                                onDeleteCertificate={this.props.onDeleteCertificate}
                                onUpdateCertficateID={this.props.onUpdateCertficateID}
                                onUpdateCertificateDate={this.props.onUpdateCertificateDate}
                            />
                        </Modal>
                    </td>
                    {/* Button Delete */}
                    <td>
                        <span className="material-icons pull-right" style={{ cursor: 'pointer' }}
                            onClick={() => this.onDeleteHardSkill(hardSkillIndex)}>clear</span>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default HardSkillFormContent;