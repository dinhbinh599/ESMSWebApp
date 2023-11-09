import { Type } from "../constant/index";

var initState = []

const positionSelectBarReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_POSITION_LIST:
            if (state.length === 0)
                state = action.positionList.slice()
            return [...state];
        default:
            return [...state];
    }
}

export default positionSelectBarReducer;