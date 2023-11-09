import { Type } from "../constant/index";

var initState = {}

const PreviosRequrieReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.GET_PREV_REQUIRE:
            if (typeof action.prevRequire !== 'undefined')
                state = action.prevRequire
            return state
        default:
            return state;
    }
}

export default PreviosRequrieReducer;