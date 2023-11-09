import { POSITION, Type } from "../constant"

const initState = {}

const PositionReducer = (state = initState, action) => {
    switch (action.type) {
        case POSITION.FETCH_POSITION_LIST_PAGING:
            state = action.positionList
            return state
        case Type.FETCH_POSITION_PROFILE_DETAIL:
            state = action.resultObj
            return state
        default:
            return state
    }
}

export default PositionReducer