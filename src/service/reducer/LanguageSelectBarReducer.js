import { Type } from "../constant/index";

var initState = []

const languageSelectBarReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_LANGUAGE_LIST:
            if (state.length === 0)
                state = action.language.slice()
            return [...state];
        default:
            return [...state];
    }
}

export default languageSelectBarReducer;