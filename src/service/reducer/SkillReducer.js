import { SKILL } from "../constant"
import { history } from "../helper/History"

const initState = {}

const skillReducer = (state = initState, action) => {
    switch (action.type) {
        case SKILL.FETCH_ALL_SKILL:
            state = action.skills
            return state
        case SKILL.GENERATE_SKILL:
            state = action.skill
            return state
        case SKILL.UPDATE_SKILL_NAME:
            var clone = { ...state }
            clone.skillName = action.skill
            state = clone
            return state
        case SKILL.UPDATE_SKILL_TYPE:
            var clone = { ...state }
            clone.skillType = parseInt(action.skillType)
            state = clone
            return state
        case SKILL.ADD_HARD_SKILL_OPTION:
            state.hardSkillOption.push(action.option)
            return state
        case SKILL.DELETE_HARD_SKILL_OPTION:
            state.hardSkillOption.splice(action.index, 1)
            return state
        case SKILL.SELECT_PROJECT_TYPE:
            var clone = { ...state.hardSkillOption[action.index] }
            clone.projectType = action.projectType
            state.hardSkillOption.splice(action.index, 1, clone)
            return state
        case SKILL.SELECT_POSITION:
            var clone = { ...state.hardSkillOption[action.index] }
            clone.position = action.position
            state.hardSkillOption.splice(action.index, 1, clone)
            return state
        case SKILL.SELECT_PROJECT_FIELD:
            state.softSkillOption = action.projectField
            return state
        case SKILL.FETCH_SKILL_DETAIL:
            state = action.skill
            return state
        case SKILL.CHANGE_STATUS:
            history.push('/skill')
        default:
            return state
    }
}

export default skillReducer