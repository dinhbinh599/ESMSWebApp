import { Type } from "../constant/index";

var initState = []

const SkillInPosition = (state = initState, action) => {
    switch (action.type) {
        case Type.SKILL_IN_POSITION_STATISTICS:
            if (state.length === 0)
                state = action.resultObj.slice()
            return [...state];
        default:
            return [...state];
    }
}

export default SkillInPosition;