import { SUGGEST_CANDIDATE } from "../constant";
import { sortSuggestListByOverallMatch } from "../util/util";

const initState = []

const getPositionIndex = (listCandidate, posID) => {
    var result = -1
    for (let i = 0; i < listCandidate.length; i++) {
        if (listCandidate[i].posID === posID) {
            result = i
        }
    }
    return result
}

const getCandidateIndex = (listCandidate, empID) => {
    var result = -1
    for (let i = 0; i < listCandidate.length; i++) {
        if (listCandidate[i].empID === empID)
            result = i
    }
    return result
}

const isSelectAllEmployee = (listCandidate) => {
    var count = 0
    for (let i = 0; i < listCandidate.length; i++) {
        if (typeof listCandidate[i].check !== 'undefined')
            if (listCandidate[i].check)
                count++
    }
    return count === listCandidate.length
}

const SuggestCandidateSelectedList = (state = initState, action) => {
    var positionIndex, positionClone, employeesClone, employeeIndex, empClone = null
    switch (action.type) {

        case SUGGEST_CANDIDATE.FETCH_SUGGEST_LIST:
            state = action.list
            return [...state]

        case SUGGEST_CANDIDATE.SELECT_CANDIDATE:
            positionIndex = getPositionIndex(state, action.posID)
            positionClone = { ...state[positionIndex] }
            employeesClone = [...positionClone.employees]
            employeeIndex = getCandidateIndex(employeesClone, action.candidate.empID)
            empClone = { ...employeesClone[employeeIndex] }
            empClone.check = action.check
            employeesClone.splice(employeeIndex, 1, empClone)
            positionClone.selectAll = isSelectAllEmployee(employeesClone)
            positionClone.employees = employeesClone
            state.splice(positionIndex, 1, positionClone)
            return [...state];

        case SUGGEST_CANDIDATE.NOTE_REJECTING_REASON:
            positionIndex = getPositionIndex(state, action.posID)
            positionClone = { ...state[positionIndex] }
            employeesClone = [...positionClone.employees]
            employeeIndex = getCandidateIndex(employeesClone, action.candidate.empID)
            empClone = { ...employeesClone[employeeIndex] }
            if (typeof empClone.check === 'undefined' || !empClone.check)
                empClone.note = action.value
            employeesClone.splice(employeeIndex, 1, empClone)
            positionClone.employees = employeesClone
            state.splice(positionIndex, 1, positionClone)
            return [...state];

        case SUGGEST_CANDIDATE.SELECT_ALL_CANDIDATE:
            positionIndex = getPositionIndex(state, action.posID)
            positionClone = { ...state[positionIndex] }
            employeesClone = [...positionClone.employees]
            employeesClone.forEach(element => {
                element.check = action.check
            });
            positionClone.selectAll = action.check
            positionClone.employees = employeesClone
            state.splice(positionIndex, 1, positionClone)
            return [...state]

        case SUGGEST_CANDIDATE.FETCH_SELECTED_LIST:
            if (state.length > 0) {
                state.forEach(element => {
                    var clone = [...element.employees]
                    // var temp = []
                    // clone.forEach(e => {
                    //     if (e.check)
                    //         temp.push(e)
                    // });
                    if (clone.length > 0)
                        sortSuggestListByOverallMatch(clone)
                    element.employees = clone
                });
            }
            return [...state]

        case SUGGEST_CANDIDATE.CONFIRM_SUGGEST:
            state.splice(0, state.length)
            return [...state]
        default:

            return [...state];
    }
}

export default SuggestCandidateSelectedList