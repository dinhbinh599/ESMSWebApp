import axios from "axios";
import { Type } from "../constant";
import { API_URL, callAPI } from "../util/util";

export const fetchDataStatistics = () => {
    var url = `${API_URL}/Project/getStatistics`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            dispatch(fetchDataStatisticsSuccess(res.data.resultObj))
        })
    }
}

export const fetchMissingEmpPosition = () => {
    var url = `${API_URL}/Project/getMissEmpPos`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            if (res.data.isSuccessed)
                dispatch(fetchDataStatisticsSuccess(res.data.resultObj))
        })
    }
}

export const fetchSkillInPosition = () => {
    var url = `${API_URL}/Project/getSkillInAllPos`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            if (res.data.isSuccessed)
                dispatch(fetchSkillInPositionSuccess(res.data.resultObj))
        })
    }
}

export const fetchSkillInPositionSuccess = (resultObj) => {
    return {
        type: Type.SKILL_IN_POSITION_STATISTICS,
        resultObj
    };
}

export const fetchDataStatisticsSuccess = (resultObj) => {
    return {
        type: Type.AWAITING_STATISTICS,
        resultObj
    };
}
