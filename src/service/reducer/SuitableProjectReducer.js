import { SUITABLE_PROJECT } from "../constant/index";

const initState = []

const SuitableProjectReducer = (state = initState, action) => {
    switch (action.type) {
        case SUITABLE_PROJECT.FETCH_SUITABLE_LIST:
            state = action.result
            return [...state]
        default:
            return [...state]
    }
}

export default SuitableProjectReducer