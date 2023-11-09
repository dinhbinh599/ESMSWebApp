import { Type } from "../constant/index";

var initState = []

const hardSkillSelectBarReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_HARD_SKILL_LIST:
            if (state.length === 0)
                state = action.hardSkillList.slice()
            return [...state];
        default:
            return [...state];
    }
}

export default hardSkillSelectBarReducer;