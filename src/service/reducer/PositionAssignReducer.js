import { POSITION_ASSIGN, Type } from "../constant"

const initState = {}

const PositionAssignReducer = (state = initState, action) => {
    var clone, certificate = null
    switch (action.type) {

        case POSITION_ASSIGN.GENERATE_POSTION_ASSIGN:
            state = action.item
            return state

        case Type.FETCH_POSITION_PROFILE_UDPATE_DETAIL:
            state = action.item
            return state

        case POSITION_ASSIGN.UPDATE_POS_ID:
            clone = { ...state }
            clone.posID = action.posID
            state = clone
            return state

        case POSITION_ASSIGN.UPDATE_POS_LEVEL:
            clone = { ...state }
            clone.posLevel = action.poslevel
            state = clone
            return state

        case POSITION_ASSIGN.ADD_LANGUAGE:
            clone = { ...state }
            clone.languages.push(action.language)
            state = clone
            return state

        case POSITION_ASSIGN.DELETE_LANGUAGE:
            clone = { ...state }
            clone.languages.splice(action.index, 1)
            state = clone
            return state

        case POSITION_ASSIGN.UPDATE_LANGUAGE_ID:
            clone = { ...state.languages[action.languageIndex] }
            clone.langID = action.value
            state.languages.splice(action.languageIndex, 1, clone)
            return state

        case POSITION_ASSIGN.UPDATE_LANGUAGE_LEVEL:
            clone = { ...state.languages[action.languageIndex] }
            clone.langLevel = action.value
            state.languages.splice(action.languageIndex, 1, clone)
            return state

        case POSITION_ASSIGN.UPDATE_SOFT_SKILL_ID:
            state.softSkills = action.value
            return state

        case POSITION_ASSIGN.ADD_HARD_SKILL:
            clone = { ...state }
            clone.hardSkills.push(action.hardSkill)
            state = clone
            return state

        case POSITION_ASSIGN.DELETE_HARD_SKILL:
            clone = { ...state }
            clone.hardSkills.splice(action.index, 1)
            state = clone
            return state

        case POSITION_ASSIGN.UPDATE_HARD_SKILL_ID:
            clone = { ...state.hardSkills[action.hardSkillIndex] }
            clone.skillID = action.value
            clone.certiList = action.certiList
            state.hardSkills.splice(action.hardSkillIndex, 1, clone)
            return state

        case POSITION_ASSIGN.UPDATE_HARD_SKILL_LEVEL:
            clone = { ...state.hardSkills[action.hardSkillIndex] }
            clone.skillLevel = action.value
            state.hardSkills.splice(action.hardSkillIndex, 1, clone)
            return state

        case POSITION_ASSIGN.ADD_CERTIFICATE:
            clone = { ...state.hardSkills[action.hardSkillIndex] }
            certificate = [...clone.empCertifications]
            certificate.push(action.certificate)
            clone.empCertifications = certificate
            state.hardSkills.splice(action.hardSkillIndex, 1, clone)
            return state

        case POSITION_ASSIGN.DELETE_CERTIFICATE:
            clone = { ...state.hardSkills[action.hardSkillIndex] }
            certificate = [...clone.empCertifications]
            certificate.splice(action.certificateIndex, 1)
            clone.empCertifications = certificate
            state.hardSkills.splice(action.hardSkillIndex, 1, clone)
            return state

        case POSITION_ASSIGN.UPDATE_CERTIFICATE_ID:
            clone = { ...state.hardSkills[action.hardSkillIndex] }
            certificate = { ...clone.empCertifications[action.certificateIndex] }
            certificate.certiID = action.value
            clone.empCertifications.splice(action.certificateIndex, 1, certificate)
            state.hardSkills.splice(action.hardSkillIndex, 1, clone)
            return state

        case POSITION_ASSIGN.UPDATE_CERTIFICATE_DATE:
            clone = { ...state.hardSkills[action.hardSkillIndex] }
            certificate = { ...clone.empCertifications[action.certificateIndex] }
            if (action.name === 'dateTake')
                certificate.dateTaken = action.value
            if (action.name === 'dateEnd')
                certificate.dateEnd = action.value
            clone.empCertifications.splice(action.certificateIndex, 1, certificate)
            state.hardSkills.splice(action.hardSkillIndex, 1, clone)
            return state

        default:
            return state
    }
}

export default PositionAssignReducer