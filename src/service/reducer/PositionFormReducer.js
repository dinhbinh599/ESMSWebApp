import { POSITION } from "../constant"

const initState = {}

const PositionFormReducer = (state = initState, action) => {
    switch (action.type) {
        case POSITION.FETCH_POSITION_DETAIL:
            state = action.pos 
            return state
        default:
            return state
    }
}

export default PositionFormReducer