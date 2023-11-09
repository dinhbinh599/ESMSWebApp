import axios from "axios"
import { store } from "react-notifications-component"
import { alertConstants, POSITION_ASSIGN, Type } from "../constant"
import { history } from "../helper/History"
import { API_URL } from "../util/util"

export const generatePositionAssign = (item) => {
    return { type: POSITION_ASSIGN.GENERATE_POSTION_ASSIGN, item }
}

export const updatePosID = (posID) => {
    return { type: POSITION_ASSIGN.UPDATE_POS_ID, posID }
}

export const updatePosLevel = (poslevel) => {
    return { type: POSITION_ASSIGN.UPDATE_POS_LEVEL, poslevel }
}

export const addLanguage = (language) => {
    return { type: POSITION_ASSIGN.ADD_LANGUAGE, language }
}

export const deleteLanguage = (index) => {
    return { type: POSITION_ASSIGN.DELETE_LANGUAGE, index }
}

export const updateLangID = (value, languageIndex) => {
    return { type: POSITION_ASSIGN.UPDATE_LANGUAGE_ID, value, languageIndex }
}

export const updateLangLevel = (value, languageIndex) => {
    return { type: POSITION_ASSIGN.UPDATE_LANGUAGE_LEVEL, value, languageIndex }
}

export const updateSoftSkillID = (value,) => {
    return { type: POSITION_ASSIGN.UPDATE_SOFT_SKILL_ID, value }
}

export const addHardSkill = (hardSkill) => {
    return { type: POSITION_ASSIGN.ADD_HARD_SKILL, hardSkill }
}

export const deleteHardSkill = (index) => {
    return { type: POSITION_ASSIGN.DELETE_HARD_SKILL, index }
}

export const updateHardSkillID = (value, hardSkillIndex) => {
    var url = `${API_URL}/Certification/getCertifications/${value}`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(updateHardSkillIDSuccess(value, hardSkillIndex, res.data.resultObj))
        })
    }
}

export const updateHardSkillIDSuccess = (value, hardSkillIndex, certiList) => {
    return { type: POSITION_ASSIGN.UPDATE_HARD_SKILL_ID, value, hardSkillIndex, certiList }
}

export const updateHardSkillLevel = (value, hardSkillIndex) => {
    return { type: POSITION_ASSIGN.UPDATE_HARD_SKILL_LEVEL, value, hardSkillIndex }
}

export const addCertificate = (hardSkillIndex, certificate) => {
    return { type: POSITION_ASSIGN.ADD_CERTIFICATE, hardSkillIndex, certificate }
}

export const deleteCertificate = (certificateIndex, hardSkillIndex) => {
    return { type: POSITION_ASSIGN.DELETE_CERTIFICATE, certificateIndex, hardSkillIndex }
}

export const updateCertificateID = (value, certificateIndex, hardSkillIndex) => {
    return { type: POSITION_ASSIGN.UPDATE_CERTIFICATE_ID, value, certificateIndex, hardSkillIndex }
}

export const updateCertificateDate = (name, value, certificateIndex, hardSkillIndex) => {
    return { type: POSITION_ASSIGN.UPDATE_CERTIFICATE_DATE, name, value, certificateIndex, hardSkillIndex }
}

export const assignPosition = (empID, positionAssign, role) => {
    var url = `${API_URL}/User/${empID}`
    return (dispatch) => {
        if (positionAssign.languages.length === 0) {
            store.addNotification({
                message: 'Please select language',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
            dispatch(assignPositionFail())
        } else if (typeof positionAssign.languages.find(e => e.langID === 0) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select language',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.languages.find(e => e.langLevel === 0) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select language level',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (positionAssign.softSkills.length === 0) {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select soft skill',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.softSkills.find(e => e === 0) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select soft skill',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (positionAssign.hardSkills.length === 0) {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select hard skill',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.hardSkills.find(e => e.skillID === 0) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select hard skill',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.hardSkills.find(e => e.skillLevel === 0) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select hard skill level',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.hardSkills.find(e => e.empCertifications.find(a => a.certiID === 0)) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select certificate',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.hardSkills.find(e => e.empCertifications.find(a => a.dateTaken === '')) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select taken date',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        }
        else {
            axios.post(
                url,
                positionAssign,
                { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } })
                .then(res => {
                    if (res.status === 200) {
                        dispatch(assignPositionSuccess())
                    }
                })
                .catch(err => {
                    store.addNotification({
                        message: err.toString(),
                        type: "danger",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 2000,
                            onScreen: false
                        }
                    })
                })
        }
    }
}

export const fetchPositionProfileUpdateDetail = (id) => {
    var url = `${API_URL}/User/loadEmpInfo/${id}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchPositionProfileUpdateDetailSuccess(res.data.resultObj))
        })
    }
}

export const updatePositionDetail = (empID, positionAssign, role) => {
    var url = `${API_URL}/User/updateEmpInfo/${empID}`
    return (dispatch) => {
        if (positionAssign.languages.length === 0) {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select language',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.languages.find(e => e.langID === 0) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select language',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.languages.find(e => e.langLevel === 0) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select language level',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (positionAssign.softSkills.length === 0) {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select soft skill',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.softSkills.find(e => e === 0) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select soft skill',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (positionAssign.hardSkills.length === 0) {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select hard skill',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.hardSkills.find(e => e.skillID === 0) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select hard skill',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.hardSkills.find(e => e.skillLevel === 0) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select hard skill level',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.hardSkills.find(e => e.empCertifications.find(a => a.certiID === 0)) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select certificate',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        } else if (typeof positionAssign.hardSkills.find(e => e.empCertifications.find(a => a.dateTaken === '')) !== 'undefined') {
            dispatch(assignPositionFail())
            store.addNotification({
                message: 'Please select taken date',
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: false
                }
            })
        }
        else {
            axios.post(
                url,
                positionAssign,
                { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } })
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.isSuccessed)
                            dispatch(updatePositionDetailSuccess(empID))
                        else {
                            dispatch(assignPositionFail())
                            store.addNotification({
                                message: res.data.message,
                                type: "danger",
                                insert: "top",
                                container: "top-center",
                                animationIn: ["animated", "fadeIn"],
                                animationOut: ["animated", "fadeOut"],
                                dismiss: {
                                    duration: 2000,
                                    onScreen: false
                                }
                            })
                        }
                    }
                })
                .catch(err => {
                    dispatch(assignPositionFail())
                    store.addNotification({
                        message: err.toString(),
                        type: "danger",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 2000,
                            onScreen: false
                        }
                    })
                })
        }
    }
}

export const fetchPositionProfileUpdateDetailSuccess = (item) => {
    return {
        type: Type.FETCH_POSITION_PROFILE_UDPATE_DETAIL,
        item
    }
}

export const assignPositionSuccess = () => {
    history.push('/employee');
    return { type: POSITION_ASSIGN.ASSIGN_POSITION }
}

export const assignPositionFail = () => {
    return { type: alertConstants.ERROR }
}

export const updatePositionDetailSuccess = (empID) => {
    history.push(`/employee/profile/${empID}`)
    return { type: POSITION_ASSIGN.UPDATE_POSITION_DETAIL }
}