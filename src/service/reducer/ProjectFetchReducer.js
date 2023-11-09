import { Type } from "../constant";

var initState = {}

const projectFormReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_PROJECT:
            state = action.resultObj
            return state
        
        case Type.UPDATE_PROJECT:
            state = action.resultObj
            return state
        default:
            return state;
    }
}

export default projectFormReducer;