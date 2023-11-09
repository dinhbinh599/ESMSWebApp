import { Type } from "../constant";

var initState = {}

const ProjectDetailFetchReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_PROJECT_DETAIL:
            state = action.resultObj
            return state
        default:
            return state;
    }
}

export default ProjectDetailFetchReducer;