import axios from "axios";
import { Type, alertConstants } from "../constant";
import { API_URL } from "../util/util";
import { history } from "../helper/History";
import { sendNotificate } from "./FirebaseAction";

export const generateProject = (project) => {
    history.push('/project/create-project')
    return {
        type: Type.GENERATE_PROJECT,
        project
    }
}

export const fetchProject = (pageIndex, search) => {
    var url = ''
    if (search.length > 0)
        url = `${API_URL}/Project/paging?Keyword=${search}&PageIndex=${pageIndex}&PageSize=10`

    else
        url = `${API_URL}/Project/paging?PageIndex=${pageIndex}&PageSize=10`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProjectSuccess(res.data.resultObj))
        })
    }
}

export const fetchEmployeeJoinedProjects = (empID, pageIndex) => {
    var url = `${API_URL}/Project/getEmployeeProjects/${empID}?PageIndex=${pageIndex}&PageSize=10`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            if (res.data.isSuccessed)
                dispatch(fetchEmployeeJoinedProjectsSuccess(res.data.resultObj))
        })
    }
}

export const fetchEmployeeJoinedProjectsSuccess = (joinedList) => {
    return { type: Type.FETCH_JOINED_PROJECTS, joinedList }
}

export const fetchPositionRequire = (projectID) => {
    var url = `${API_URL}/Project/getRequiredPositions/${projectID}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchPositionRequireSuccess(res.data.resultObj !== null ? res.data.resultObj : []))
        })
    }
}

export const fetchProjectType = () => {
    var url = `${API_URL}/Project/getProjectTypes`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchPostionTypeSuccess(res.data.resultObj))
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login')
            }
        })
    }
}

export const fetchProjectField = () => {
    var url = `${API_URL}/Project/getProjectFields`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchProjectFieldSuccess(res.data.resultObj))
        }).catch(err => {
            if (err.response.status === 401) {
                history.push('/login')
            }
        })
    }
}

export const fetchCandidatesResult = requireID => {
    var url = `${API_URL}/Project/getEmpByRequiredID/${requireID}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            if (res.data.isSuccessed)
                dispatch(fetchCandidatesResultSuccess(res.data.resultObj !== null ? res.data.resultObj : []))
        })
    }
}

export const fetchCandidatesResultSuccess = (result) => {
    return { type: Type.FETCH_CANDIDATES_RESULT, result }
}


export const fetchPostionTypeSuccess = (projectType) => {
    return {
        type: Type.FETCH_PROJECT_TYPE,
        projectType
    }
}

export const fetchProjectFieldSuccess = (projectField) => {
    return {
        type: Type.FETCH_PROJECT_FIELD,
        projectField
    }
}

export const fetchPositionRequireSuccess = (resultObj) => {
    return {
        type: Type.FETCH_POSITION_REQUIRE,
        resultObj
    }
}

export const fetchProjectSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROJECT,
        resultObj
    }
}

export const fetchProjectDetail = (projectID) => {
    var url = `${API_URL}/Project/${projectID}`
    return (dispatch) => {
        return axios.get(url, { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).then(res => {
            dispatch(fetchProjectDetailSuccess(res.data.resultObj))
        })
    }
}

export const fetchProjectDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROJECT_DETAIL,
        resultObj
    }
}

export const updateProject = (project, id) => {
    var url = `${API_URL}/Project/${id}`
    return (dispatch) => {
        return axios.put(
            url,
            project,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).then(res => {
                dispatch(updateProjectSuccess(res.data.resultObj))
            })
    }
}

export const changeStatusToFinish = projectID => {
    var url = `${API_URL}/Project/changeStatus/${projectID}`
    return dispatch => {
        return axios.put(
            url,
            null,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).then(res => {
                dispatch(fetchProjectDetail(projectID))
            })
    }
}

export const updateProjectSuccess = (resultObj) => {
    return {
        type: Type.UPDATE_PROJECT,
        resultObj
    }
}

export const declineProject = (projectID, projectName, pmID) => {
    var url = `${API_URL}/Project/${projectID}`
    return (dispatch) => {
        return axios.delete(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).
            then(res => {
                if (res.data.isSuccessed) {
                    setTimeout(() => {
                        dispatch(sendNotificate(pmID, `Project ${projectName} has been declined`))
                    }, 5000);
                    dispatch(declineProjectSuccess())
                }
            }).catch(err => {
                dispatch(declineProjectFail())
            })
    }
}

export const declineProjectSuccess = () => {
    history.push('/project')
    return { type: Type.DECLINE_PROJECT }
}

export const declineProjectFail = () => {
    return { type: alertConstants.ERROR }
}


