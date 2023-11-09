import axios from "axios"
import { ADD_MORE_CANDIDATES } from "../constant"
import { API_URL } from "../util/util"

export const setPositionSelect = index => {
    return {
        type: ADD_MORE_CANDIDATES.SET_SELECT_POSITION,
        index
    }
}

export const selectCandidate = (candidate, candidateList, limit) => {
    return {
        type: ADD_MORE_CANDIDATES.SELECT_CANDIDATE,
        candidate, candidateList, limit
    }
}

export const selectAllCandidates = (candidateList) => {
    return {
        type: ADD_MORE_CANDIDATES.SELECT_ALL_CANDIDATE,
        candidateList
    }
}

export const unselectCandiate = (candidate, position) => {
    return {
        type: ADD_MORE_CANDIDATES.UNSELECT_CANDIDATE,
        candidate, position
    }
}

export const unselectAllCandiates = (position) => {
    return {
        type: ADD_MORE_CANDIDATES.UNSELECT_ALL_CANDIDATE,
        position
    }
}

export const fetchSelectedList = () => {
    return {
        type: ADD_MORE_CANDIDATES.FETCH_SELECTED_LIST
    }
}

export const fetchSuggestList = () => {
    var projectID = localStorage.getItem('projectId')
    var projectType = localStorage.getItem('projectType')
    var projectField = localStorage.getItem('projectField')
    var urlToGetListSuggest = `${API_URL}/User/candidate/${projectID}`
    var positionItem = JSON.parse(localStorage.getItem('positionRequire'))
    var position = { requiredPositions: positionItem, projectTypeID: parseInt(projectType), projectFieldID: parseInt(projectField) }
    return (dispatch) => {
        axios.post(
            urlToGetListSuggest,
            position,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
        ).then(res => {
            if (res.status === 200) {
                dispatch(fetchSuggestListSuccess(res.data.resultObj))
            }
        })
    }
}

export const fetchSuggestListSuccess = (list) => {
    return {
        type: ADD_MORE_CANDIDATES.FETCH_SUGGEST_LIST,
        list
    }
}

export const sortSuggestList = value => {
    return {
        type: ADD_MORE_CANDIDATES.SORT_LIST,
        value
    }
}

export const confirmSuggestListSuccess = () => {
    return { type: ADD_MORE_CANDIDATES.CONFIRM_SUGGEST }
}

export const confirmSuggestListFail = () => {
    return { type: ADD_MORE_CANDIDATES.CONFIRM_SUGGEST_FAIL }
}