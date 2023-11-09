import { Type } from "../constant"

const initState = []

const PositionRequireReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_POSITION_REQUIRE:
            state = action.resultObj
            return [...state]
        default:
            return [...state]
    }
}

export default PositionRequireReducer