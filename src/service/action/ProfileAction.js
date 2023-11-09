import axios from "axios";
import { Type } from "../constant";
import { API_URL } from "../util/util";
import { history } from "../helper/History";

export const generateProfile = (profile) => {
    history.push('/employee/register')
    return {
        type: Type.GENERATE_PROFILE,
        profile
    }
}

export const fetchProfile = (pageIndex, search, role) => {
    var url = ''
    if (search.length > 0) {
        url = `${API_URL}/User/paging?Keyword=${search}&RoleName=${role}&PageIndex=${pageIndex}&PageSize=10`
    } else
        url = `${API_URL}/User/paging?RoleName=${role}&PageIndex=${pageIndex}&PageSize=10`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            console.log(res.data)
            dispatch(fetchProfileSuccess(res.data.resultObj))
        })
    }
}


export const fetchProfileDetail = (id) => {
    var url = `${API_URL}/User/${id}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchProfileDetailSuccess(res.data.resultObj))
        })
    }
}

export const fetchPositionProfileDetail = (id) => {
    var url = `${API_URL}/User/getEmpInfo/${id}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchPositionProfileDetailSuccess(res.data.resultObj))
        })
    }
}

export const createUser = (profile, match) => {
    var url = `${API_URL}/User`
    return (dispatch) => {
        return axios.post(
            url,
            profile,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            if (res.status === 200) {
                localStorage.setItem('EMP', JSON.stringify(res.data.resultObj.empId));
                dispatch(createProfileSuccess(profile))
                if (typeof match === 'undefined') {
                    history.push('/empList/create-position')
                }
                else {
                    history.push(`/empList/detail/${match.params.id}`)

                }
            }
        }).catch(err => {
            if (err.response.status === 401) {

                history.push('/login')
            }
        })
    }
}

export const updateProfile = (id, profile) => {
    var url = `${API_URL}/User/${id}`
    return (dispatch) => {
        return axios.put(
            url,
            profile,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }).then(res => {
                dispatch(updateProfileSuccess(id))
            })
    }
}

export const fetchProfileSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROFILE,
        resultObj
    }
}

export const fetchProfileDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_PROFILE_DETAIL,
        resultObj
    }
}

export const fetchPositionProfileDetailSuccess = (resultObj) => {
    return {
        type: Type.FETCH_POSITION_PROFILE_DETAIL,
        resultObj
    }
}

export const updateProfileSuccess = (empID) => {
    history.push(`/employee/profile/${empID}`)
    return {
        type: Type.UPDATE_PROFILE,
    }
}

export const createProfileSuccess = profile => {
    return {
        type: Type.CREATE_USER,
        profile
    }
}

export const pushToProfilePage = () => {
    history.push('/profile')
    return { type: Type.PROFILE_PAGE }
}