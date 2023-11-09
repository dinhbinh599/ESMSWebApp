import { CERTIFICATION } from "../constant/index";

var initState = {}

const certificationSelectBarReducer = (state = initState, action) => {
    switch (action.type) {
        case CERTIFICATION.FETCH_CERTIFICATION_PAGING:
            state = action.certiList
            return state;
        case CERTIFICATION.GENERATE_CERTIFICATION:
            state = action.certi
            return state
        case CERTIFICATION.UPDATE_CERTIFICATION_NAME:
            var clone = { ...state }
            if (action.name === 'certificationName')
                clone.certificationName = action.value
            if (action.name === 'description')
                clone.description = action.value
            state = clone
            return state
        case CERTIFICATION.UPDATE_SKILL:
            var clone = { ...state }
            clone.skillID = parseInt(action.value)
            state = clone
            return state
        case CERTIFICATION.UPDATE_LEVEL:
            var clone = { ...state }
            clone.certiLevel = parseInt(action.value)
            state = clone
            return state
        case CERTIFICATION.FETCH_CERTIFICATION_DETAIL:
            state = action.certi
            return state
        default:
            return state;
    }
}

export default certificationSelectBarReducer;