import axios from "axios"
import { store } from "react-notifications-component"
import { SUGGEST_CANDIDATE } from "../constant"
import { history } from "../helper/History"
import { API_URL } from "../util/util"
import { sendNotificate } from "./FirebaseAction"

export const setPositionSelect = index => {
    return {
        type: SUGGEST_CANDIDATE.SET_SELECT_POSITION,
        index
    }
}

export const selectCandidate = (check, candidate, posID) => {
    return {
        type: SUGGEST_CANDIDATE.SELECT_CANDIDATE,
        check, candidate, posID
    }
}

export const noteRejectingReason = (value, candidate, posID) => {
    return {
        type: SUGGEST_CANDIDATE.NOTE_REJECTING_REASON,
        value, candidate, posID
    }
}

export const selectAllCandidates = (check, posID) => {
    return {
        type: SUGGEST_CANDIDATE.SELECT_ALL_CANDIDATE,
        check, posID
    }
}

export const fetchSelectedList = () => {
    return {
        type: SUGGEST_CANDIDATE.FETCH_SELECTED_LIST
    }
}

export const fetchSuggestList = (projectID) => {
    var urlToGetListSuggest = `${API_URL}/Project/getCandidates/${projectID}`
    return (dispatch) => {
        axios.get(
            urlToGetListSuggest,
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
        type: SUGGEST_CANDIDATE.FETCH_SUGGEST_LIST,
        list
    }
}

export const confirmSuggestList = (suggestList, projectID, projectName, pmID, optionType) => {
    console.log('a', suggestList, projectName, pmID, optionType)
    var url = `${API_URL}/Project/confirmCandidate/${projectID}`
    // console.log('pm', suggestList)
    return (dispatch) => {
        if (typeof suggestList.candidates.find(e => e.empIDs.find(k => !k.isAccept && k.note.length === 0)) !== 'undefined')
            store.addNotification({
                message: "Please type rejecting reason for the candidate you not accept",
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
        else {
            axios.post(
                url,
                suggestList,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")} ` } }
            ).then(res => {
                if (res.status === 200) {
                    if (res.data.isSuccessed) {
                        setTimeout(() => {
                            console.log('ok')
                            dispatch(sendNotificate("" + pmID, `Employee for project '${projectName}' has been confirmed `))
                        }, 5000);
                        localStorage.removeItem('projectId')
                        localStorage.removeItem('pmID')
                        localStorage.removeItem('projectType')
                        localStorage.removeItem('projectField')
                        localStorage.removeItem('projectName')
                        localStorage.removeItem('positionRequire')
                        localStorage.removeItem('dateCreate')
                        localStorage.removeItem('dateEnd')
                        // suggestList.candidates.forEach(element => {
                        //     element.empIDs.forEach(e1 => {
                        //         setTimeout(() => {
                        //             dispatch(sendNotificate(e1, `You has been confirm to join project '${projectName}'`))
                        //         }, 5000);
                        //     });
                        // });
                        dispatch(confirmSuggestListSuggest())
                        if (typeof optionType !== 'undefined') {
                            history.push(`employee/profile/${optionType}`)
                        } else {
                            history.push("/project")
                        }
                    }else{
                        console.log(res.data)
                    }
                }
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
                // console.log(err.response.data.message)
            })
        }
    }
}

export const confirmSuggestListSuggest = () => {
    history.push('/project')
    return { type: SUGGEST_CANDIDATE.CONFIRM_SUGGEST }
}