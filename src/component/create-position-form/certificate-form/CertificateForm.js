import React, { Component } from 'react';
import { connect } from 'react-redux';
import CertificateFormContent from './certificate-form-content/CertificateFormContent';
import { fetchCertification } from "../../../service/action/CertificationSelectBarAction";

class CertificateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empCertifications: {
                certiID: 0,
                dateTaken: "",
                dateEnd: ""
            },
            isMinimize: false
        }
    }

    componentDidMount = () => {
        this.props.fetchCertificateList(this.props.hardSkillID)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.hardSkillID !== prevState.hardSkillID) {
            return { someState: nextProps.hardSkillID };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.hardSkillID !== this.props.hardSkillID) {
            this.props.fetchCertificateList(this.props.hardSkillID)
        }
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    getCertificateListNotSelect = () => {
        var { certiList, certificate } = this.props
        var listNotSelect = certiList.slice(0, certiList.length)
        for (let i = 0; i < listNotSelect.length; i++) {
            for (let k = 0; k < certificate.length; k++) {
                if (listNotSelect[i].certificationID === certificate[k].certiID) {
                    var clone = { ...listNotSelect[i] }
                    clone.isSelect = true
                    listNotSelect[i] = clone
                }
            }
        }
        return listNotSelect
    }

    showItems = (certificate, hardSkillIndex) => {
        var result = null
        var certificateList = this.getCertificateListNotSelect()
        if (typeof certificate !== 'undefined') {
            result = certificate.map((certificateDetail, certificateIndex) => {
                return (
                    <CertificateFormContent key={certificateIndex}
                        certificateDetail={certificateDetail}
                        certificateIndex={certificateIndex}
                        certificateList={certificateList}
                        hardSkillIndex={hardSkillIndex}

                        onDeleteCertificate={this.props.onDeleteCertificate}
                        onUpdateCertficateID={this.props.onUpdateCertficateID}
                        onUpdateCertificateDate={this.props.onUpdateCertificateDate}
                    />
                );
            })
        }
        return result;
    }

    onAddCertificate = (hardSkillIndex) => {
        this.props.onAddCertificate(hardSkillIndex, this.state.empCertifications)
    }

    render() {
        var { certificate, hardSkillIndex } = this.props
        const showCerti = (certificate) => {
            if (this.state.isMinimize || this.props.hardSkillID === 0)
                return ""
            else
                return (
                    <>
                        {this.showItems(certificate, hardSkillIndex)}
                        {this.props.certiList.length === this.props.certificate.length ?
                            '' :
                            <span className="material-icons add" style={{ marginTop: 10 }}
                                onClick={() => this.onAddCertificate(hardSkillIndex)}>add_box</span>
                        }
                    </>
                )
        }

        return (
            <div>
                {!this.state.isMinimize ?
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead >
                                    <tr>
                                        <th>Certificate</th>
                                        <th>Taken Date</th>
                                        <th>Expired Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showCerti(certificate)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        certificateList: state.CertificationSelectBarReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        fetchCertificateList: (hardSkillID) => {
            dispatch(fetchCertification(hardSkillID))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(CertificateForm);