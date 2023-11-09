import { Type } from "../constant/index";

var initState = []

const ProjectTypeReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_PROJECT_TYPE:
            state = []
            if (state.length === 0)
                state = action.projectType.slice()
            return [...state];
        case Type.FETCH_PROJECT_FIELD:
            state = []
            if (state.length === 0)
                state = action.projectField.slice()
            return [...state];
        default:
            return [...state];
    }
}

export default ProjectTypeReducer;