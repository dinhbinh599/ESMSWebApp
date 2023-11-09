import { Type } from "../constant/index";

var initState = []

const softSkillSelectBarReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_SOFT_SKILL_LIST:
            if (state.length === 0)
                state = action.softSkillList.slice()
            return [...state];
        default:
            return [...state];
    }
}

export default softSkillSelectBarReducer;