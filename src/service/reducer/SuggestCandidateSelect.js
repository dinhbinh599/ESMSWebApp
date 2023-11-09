import { SUGGEST_CANDIDATE } from "../constant";

const initState = 0

const SuggestCandidateSelect = (state = initState, action) => {
    switch (action.type) {
        case SUGGEST_CANDIDATE.SET_SELECT_POSITION:
            state = action.index
            return state
        default:
            return state;
    }
}

export default SuggestCandidateSelect