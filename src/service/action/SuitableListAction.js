import axios from "axios"
import { SUITABLE_PROJECT } from "../constant/index"
import { API_URL } from "../util/util"

export const fetchSuitableList = (empID) => {
    var url = `${API_URL}/User/candidate/${empID}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchSuitableListSuccess(res.data.resultObj))
        }).catch(err => {
            // dispatch(fetchSuitableList([]))
        })
    }
}

export const fetchSuitableListSuccess = (result) => {
    return {
        type: SUITABLE_PROJECT.FETCH_SUITABLE_LIST,
        result
    }
}
