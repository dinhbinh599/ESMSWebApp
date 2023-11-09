import { Type } from "../constant/index";

var initState = {}

const JoinedProjectReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_JOINED_PROJECTS:
            state = action.joinedList
            return state;
        default:
            return state;
    }
}

export default JoinedProjectReducer;