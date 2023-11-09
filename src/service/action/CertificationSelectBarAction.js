import { CERTIFICATION, Type } from "../constant/index"
import axios from "axios";
import { API_URL } from "../util/util";
import { store } from "react-notifications-component";
import { history } from "../helper/History";

export const fetchCertification = (hardSkillID) => {
    var url = `${API_URL}/Certification/getCertifications/${hardSkillID}`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchCertificationSuccess(res.data.resultObj))
        })
    }
}

export const fetchCertificationPaging = (pageIndex, search) => {
    var url = ''
    if (search.length > 0)
        url = `${API_URL}/Certification/paging?Keyword=${search}&PageIndex=${pageIndex}&PageSize=10`
    else
        url = `${API_URL}/Certification/paging?PageIndex=${pageIndex}&PageSize=10`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchCertificationPagingSuccess(res.data.resultObj))
        })
    }
}

export const fetchCertificationDetail = (certiID) => {
    var url = `${API_URL}/Certification/${certiID}`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchCertificationDetailSuccess(res.data.resultObj))
        })
    }
}

export const createCertification = (certification) => {
    var url = `${API_URL}/Certification`
    return (dispatch) => {
        if (certification.certificationName.length === 0) {
            dispatch(createCertificationFail())
            store.addNotification({
                message: "Certificate name is required",
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
        else if (certification.description.length === 0) {
            dispatch(createCertificationFail())
            store.addNotification({
                message: "Certificate description is required",
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
        else if (certification.skillID === 0) {
            dispatch(createCertificationFail())
            store.addNotification({
                message: "Skill is required",
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
        else if (certification.certiLevel === 0) {
            dispatch(createCertificationFail())
            store.addNotification({
                message: "Certificate level is required",
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
                certification,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(res => {
                if (res.data.isSuccessed)
                    history.push('/certification')
            }).catch(err => {
                store.addNotification({
                    message: err.response.data.message,
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

export const updateCertificate = (certi) => {
    var url = `${API_URL}/Certification/${certi.certificationID}`
    var item = {
        certificationName: certi.certificationName,
        description: certi.description,
        skillID: certi.skillID,
        certiLevel: certi.certiLevel
    }
    return (dispatch) => {
        axios.put(
            url,
            item,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            if (res.status = 200) {
                dispatch(updateCertificateSuccess())
            }
        }).catch(err => {
            // if (err.response.status === 401) {
            //     history.push('/login')
            // }
        })
    }
}

export const changeStatus = (certificationID, pageIndex, search) => {
    var url = `${API_URL}/Certification/changeStatus/${certificationID}`
    return (dispatch) => {
        axios.put(
            url,
            null,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            if (res.status = 200) {
                dispatch(fetchCertificationPaging(pageIndex, search))
            }
        }).catch(err => {
            // if (err.response.status === 401) {
            //     history.push('/login')
            // }
        })
    }
}

export const generateCertification = () => {
    var certi = {
        certificationName: "",
        description: "",
        skillID: 0,
        certiLevel: 0
    }
    return { type: CERTIFICATION.GENERATE_CERTIFICATION, certi }
}

export const fetchCertificationSuccess = (certiList) => {
    return {
        type: Type.FETCH_CERTIFICATION_LIST,
        certiList
    };
}

export const fetchCertificationPagingSuccess = (certiList) => {
    return {
        type: CERTIFICATION.FETCH_CERTIFICATION_PAGING,
        certiList
    };
}

export const fetchCertificationDetailSuccess = (certi) => {
    return {
        type: CERTIFICATION.FETCH_CERTIFICATION_DETAIL,
        certi
    };
}

export const createCertificationFail = () => {
    return { type: CERTIFICATION.CREATE_FAIL }
}

export const updateCertificationName = (name, value) => {
    return { type: CERTIFICATION.UPDATE_CERTIFICATION_NAME, name, value }
}

export const updateSKillId = (value) => {
    return { type: CERTIFICATION.UPDATE_SKILL, value }
}

export const updateCertiLevel = (value) => {
    return { type: CERTIFICATION.UPDATE_LEVEL, value }
}

export const updateCertificateSuccess = () => {
    history.push('/certification')
    return { type: CERTIFICATION.UPDATE_CERTIFICATION }
}