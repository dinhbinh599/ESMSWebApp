import axios from "axios"
import { Type } from "../constant"
import { API_URL } from "../util/util"

export const fetchListEmployee = (projectID, page) => {
    var url = `${API_URL}/Project/getEmpsInProject/${projectID}?PageIndex=${page}&PageSize=5`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            if (res.status === 200) {
                dispatch(fetchListEmployeeSuccess(res.data.resultObj))
            }
        })
    }
}

export const fetchListEmployeeSuccess = list => {
    return {
        type: Type.FETCH_LIST_EMPLOYEE,
        list
    }
}