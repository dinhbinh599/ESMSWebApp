import { Type } from "../constant/index";

const initState = []

const CandidateResultReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_CANDIDATES_RESULT:
            state = action.result
            return [...state]
        default:
            return [...state];

    }
}

export default CandidateResultReducer;